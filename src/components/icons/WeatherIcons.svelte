<script>
	export let color = "#000";
	export let filled = true;
	export let fill = filled ? color : "none";
	export let size = "1em"; // default 1em match the parent element
	// default heart icon
	export let d = "";
</script>

<style>
	.icon {
		position: relative;
		display: inline-block;
	}
</style>

<svg
	class="icon"
	viewBox="0 0 30 30"
	{fill}
	width={size}
	height={size}
	xmlns="http://www.w3.org/2000/svg">
    <path {d}/>
</svg>
