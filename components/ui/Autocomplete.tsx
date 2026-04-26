"use client";

import * as React from "react";

import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

interface AutocompleteInputProps {
	items: string[];
	defaultValue?: string[];
	onChange?: (value: string[]) => void;
	className?: string;
	placeholder?: string;
	onHover?: (value: string) => void;
	onHoverLeave?: () => void;
}

export function AutocompleteInput({
	items,
	defaultValue,
	onChange,
	className,
	placeholder,
	onHover,
	onHoverLeave,
}: AutocompleteInputProps) {
	const anchor = useComboboxAnchor();

	return (
		<Combobox
			multiple
			autoHighlight
			items={items}
			defaultValue={defaultValue ?? undefined}
			onValueChange={onChange}
		>
			<ComboboxChips
				ref={anchor}
				className={cn("w-full max-w-xs bg-black ", className)}
			>
				<ComboboxValue>
					{(values) => (
						<React.Fragment>
							{values.map((value: string) => (
								<ComboboxChip key={value}>{value}</ComboboxChip>
							))}
							<ComboboxChipsInput placeholder={placeholder} />
						</React.Fragment>
					)}
				</ComboboxValue>
			</ComboboxChips>
			<ComboboxContent anchor={anchor} className="bg-black" side="bottom">
				<ComboboxEmpty>No items found.</ComboboxEmpty>
				<ComboboxList>
					{(item) => (
						<ComboboxItem
							key={item}
							value={item}
							onMouseEnter={() => onHover?.(item)}
							onMouseLeave={() => onHoverLeave?.()}
						>
							{item}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
