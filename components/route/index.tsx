"use client";

import { AutocompleteInput } from "@/components/ui/Autocomplete";
import { NEW_YORK_LOCATIONS } from "@/components/location";
import {
	Map as MapView,
	MapControls,
	MapMarker,
	MapRoute,
	MarkerContent,
	MarkerLabel,
} from "@/components/ui/map";
import { Button } from "@base-ui/react";
import { Clock, Loader2, Route } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ShowLocationHighlight } from "@/components/route/show-location-hoghlight";
import { formatDuration, formatDistance } from "@/components/route/utils";
import type { RouteData } from "@/components/route/types";

const DEFAULT_LOCATIONS = NEW_YORK_LOCATIONS.filter(
	(location) =>
		location.name === "Wall Street" ||
		location.name === "One World Observatory",
);

export function RouteMap() {
	const [locations, setLocations] =
		useState<typeof NEW_YORK_LOCATIONS>(DEFAULT_LOCATIONS);
	const [routes, setRoutes] = useState<RouteData[]>([]);
	const [routeHighlight, setRouteHighlight] = useState<string | null>(null);
	const [selectedIndex, setSelectedIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		let cancelled = false;

		void (async () => {
			await Promise.resolve();
			if (cancelled) return;

			if (locations.length === 0) {
				setIsLoading(false);
				return;
			}

			setIsLoading(true);

			const locationString = [...locations]
				.sort((a, b) => a.lat - b.lat || a.lng - b.lng)
				.map((location) => `${location.lng},${location.lat}`)
				.join(";");

			try {
				const response = await fetch(
					`https://router.project-osrm.org/route/v1/driving/${locationString}?overview=full&geometries=geojson&alternatives=true`,
				);
				const data = await response.json();

				if (cancelled) return;

				if (data.routes?.length > 0) {
					const routeData: RouteData[] = data.routes.map(
						(route: {
							geometry: { coordinates: [number, number][] };
							duration: number;
							distance: number;
						}) => ({
							coordinates: route.geometry.coordinates,
							duration: route.duration,
							distance: route.distance,
						}),
					);
					setRoutes(routeData);
				}
			} catch (error) {
				console.error("Failed to fetch routes:", error);
			} finally {
				if (!cancelled) {
					setIsLoading(false);
				}
			}
		})();

		return () => {
			cancelled = true;
		};
	}, [locations]);

	const sortedRoutes = routes
		.map((route, index) => ({ route, index }))
		.sort((a, b) => {
			if (a.index === selectedIndex) return 1;
			if (b.index === selectedIndex) return -1;
			return 0;
		});

	const mapFitCoordinates = useMemo(() => {
		const points: [number, number][] = locations.map((l) => [l.lng, l.lat]);
		const selected = routes[selectedIndex];
		if (selected?.coordinates?.length) {
			points.push(...selected.coordinates);
		}
		return points;
	}, [locations, routes, selectedIndex]);

	return (
		<div>
			<div className="flex flex-1 bg-zinc-50 font-sans dark:bg-black">
				<div className="h-screen w-full relative">
					<MapView center={[-73.97, 40.7484]} zoom={10.5}>
						<MapControls
							showCompass
							centralizeCoordinates={
								mapFitCoordinates.length > 0
									? {
											coordinates: mapFitCoordinates,
											fitPadding: { top: 100, bottom: 80, left: 48, right: 48 },
											maxZoom: 16,
										}
									: undefined
							}
						/>
						{sortedRoutes.map(({ route, index }) => {
							const isSelected = index === selectedIndex;
							return (
								<MapRoute
									key={index}
									coordinates={route.coordinates}
									color={isSelected ? "#6366f1" : "#a7bfe0"}
									width={isSelected ? 6 : 5}
									opacity={isSelected ? 1 : 0.6}
									onClick={() => setSelectedIndex(index)}
								/>
							);
						})}

						{locations.map((location) => (
							<MapMarker
								key={location.id}
								longitude={location.lng}
								latitude={location.lat}
							>
								<MarkerContent>
									<div className="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
									<MarkerLabel position="bottom">{location.name}</MarkerLabel>
								</MarkerContent>
							</MapMarker>
						))}
						{routeHighlight ? (
							<ShowLocationHighlight location={routeHighlight} />
						) : null}
					</MapView>

					{routes.length > 0 && (
						<div
							className="absolute top-3 right-3 flex flex-col gap-2 
            bg-[#000000c7] shadow-xl shadow-black p-4 rounded-lg"
						>
							{routes.map((route, index) => {
								const isFastest = index === 0;
								return (
									<Button
										key={route.coordinates.join(",")}
										onClick={() => setSelectedIndex(index)}
										className="justify-start gap-3"
									>
										<div className="flex items-center gap-1.5">
											<Clock className="size-3.5" />
											<span className="font-medium">
												{formatDuration(route.duration)}
											</span>
										</div>
										<div className="flex items-center gap-1.5 text-xs opacity-80">
											<Route className="size-3" />
											{formatDistance(route.distance)}
										</div>
										{isFastest && (
											<span className="text-[10px] px-1.5 py-0.5 rounded font-medium bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
												Fastest
											</span>
										)}
									</Button>
								);
							})}
						</div>
					)}

					{isLoading && (
						<div className="absolute inset-0 flex items-center justify-center bg-background/50">
							<Loader2 className="size-6 animate-spin text-muted-foreground" />
						</div>
					)}
				</div>
			</div>
			<div className="flex w-full p-2 absolute top-5 left-5">
				<AutocompleteInput
					placeholder="Select locations"
					className="shadow-xl shadow-black"
					defaultValue={DEFAULT_LOCATIONS.map((location) => location.name)}
					items={NEW_YORK_LOCATIONS.map((location) => location.name)}
					onChange={(value) => {
						setLocations(
							NEW_YORK_LOCATIONS.filter((location) =>
								value.includes(location.name),
							),
						);
					}}
					onHover={(value) => {
						setRouteHighlight(value);
					}}
					onHoverLeave={() => {
						setRouteHighlight(null);
					}}
				/>
			</div>
		</div>
	);
}
