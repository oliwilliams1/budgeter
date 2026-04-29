import { useRef, useCallback } from "react";
import { Layout, Model, Actions, DockLocation, type IJsonModel, type TabNode, type Node} from "@aptre/flex-layout";

import "@aptre/flex-layout/style/light.css";

import "./panels/index";
import { getAllPanels, getPanel } from "./panels/registry";

import "./app.css";

type LayoutHandle = InstanceType<typeof Layout> & {
	addTabWithDragAndDropIndirect?: (
		title: string,
		json: Record<string, unknown>,
		onDrop?: () => void
	) => void;
};

const INITIAL_JSON: IJsonModel = {
	global: {
		tabEnableClose: true,
		tabSetEnableMaximize: true,
		tabSetEnableDeleteWhenEmpty: true,
		splitterSize: 5,
	},
	borders: [],
	layout: {
		type: "row",
		weight: 100,
		id: "root-row",
		children: [{
			type: "tabset",
			weight: 100,
			id: "main-tabset",
			children: [],
		}]
	},
};

let uid = 1;

export default function App() {
	const layoutRef = useRef<LayoutHandle | null>(null);
	const modelRef = useRef<Model>(Model.fromJson(INITIAL_JSON));

	const factory = useCallback((node: TabNode) => {
		const id = node.getComponent() as string;
		const info = getPanel(id);

		if (!info) {
			return (
				<div className="panel-content">
				<em>Unknown panel: {id}</em>
				</div>
			);
		}

		const Comp = info.component;
		return <Comp />;
	}, []);

	const addPanelByClick = useCallback((panelId: string) => {
		const info = getPanel(panelId);
		if (!info) return;

		let targetId: string | null = null;

		modelRef.current.visitNodes((node: Node) => {
			if (node.getType() === "tabset" && !targetId) {
				targetId = node.getId();
			}
		});

		if (!targetId) return;

		modelRef.current.doAction(
			Actions.addNode(
				{
					type: "tab",
					id: `${panelId}-${uid++}`,
					name: info.label,
					component: panelId,
				},
				targetId,
				DockLocation.CENTER,
				-1,
				true
			)
		);
	}, []);

	const panels = getAllPanels();

	return (
		<div className="app-shell">
			<header className="toolbar">
				<p className="toolbar-title">test layout</p>

				<div className="toolbar-sep" />

				<p className="toolbar-hint">Click to add panel:</p>

				<div className="toolbar-panels">
					{panels.map(({ id, label }) => (
						<button
							key={id}
							className="toolbar-panel-btn"
							title={`Click to add: ${label}`}
							onClick={() => addPanelByClick(id)}
						>
							{label}
						</button>
					))}
				</div>

				<p style={{ marginLeft: "auto" }}>Hi sol!</p>

			</header>

			<div className="layout-canvas">
				<Layout
					ref={layoutRef}
					model={modelRef.current}
					factory={factory}
				/>
			</div>
		</div>
	);
}