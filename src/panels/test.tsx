import { registerPanel } from "./registry";

function Example1() {
	return (
		<div className="panel-content">
			<h1 className="panel-heading">Example 1</h1>
			<p className="panel-body">
				Example 1
			</p>
		</div>
	);
}

registerPanel({
	id:        "example1",
	label:     "Example 1",
	component: Example1,
});

export default Example1;