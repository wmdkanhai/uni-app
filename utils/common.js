export const _showToast = (msg) => {
	uni.showToast({
		title: msg,
		icon: 'none',
		duration: 2000
	});
}