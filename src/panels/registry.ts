import type { ComponentType } from "react";

export interface PanelDefinition {
	id: string;
	label: string;
	component: ComponentType;
}

const registry: Record<string, PanelDefinition> = {};

export function registerPanel(panel: PanelDefinition): void {
	const { id, label, component } = panel;

	if (registry[id]) {
	console.warn(
		`Panel "${id}" already registered, overwriting.`
	);
	}

	registry[id] = { id, label, component };
}

export function getAllPanels(): PanelDefinition[] {
	return Object.values(registry);
}

export function getPanel(id: string): PanelDefinition | undefined {
	return registry[id];
}