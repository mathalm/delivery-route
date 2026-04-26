import { NEW_YORK_LOCATIONS } from "../location";
import { MapMarker, MarkerContent, MarkerLabel } from "@/components/ui/map";

export const ShowLocationHighlight = ({ location }: { location: string }) => {
	const locationHighlighted = NEW_YORK_LOCATIONS.find(
		(loc) => loc.name === location,
	);
	if (!locationHighlighted) return null;

	return (
		<MapMarker
			longitude={locationHighlighted.lng}
			latitude={locationHighlighted.lat}
		>
			<MarkerContent>
				<div className="size-5 rounded-full bg-red-500 border-2 border-white shadow-lg" />
				<MarkerLabel position="bottom">{locationHighlighted.name}</MarkerLabel>
			</MarkerContent>
		</MapMarker>
	);
};
