import { registerPanel } from "./registry";

function Example2() {
	return (
		<div className="panel-content">
			<h1 className="panel-heading">Example 2</h1>
			<p className="panel-body">
				This is panel <strong>Example 2</strong>.
				Replace this component body with real content.
			</p>
		</div>
	);
}

registerPanel({
	id:        "example2",
	label:     "Example 2",
	component: Example2,
});

export default Example2;