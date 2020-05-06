<template>
	<tfoot>
		<tr>
			<td colspan="999999" style="padding:20px">
				<slot></slot>
			</td>
		</tr>
	</tfoot>
</template>
<script>
	export default {
		name: "DefaultTableFoot"
	}
</script>