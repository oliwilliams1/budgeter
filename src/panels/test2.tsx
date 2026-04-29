import { registerPanel } from "./registry";

function Example2() {
	return (
		<p>example 2</p>
	);
}

registerPanel({
	id: "example2",
	label: "Example 2",
	component: Example2,
});

export default Example2;