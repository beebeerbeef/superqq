function dSlice(s) {
	let _s = s.replace(/[^0-9]/ig, '')
  let arr = _s.split('')
  for(let i=0; i<arr.length-1; i++) {
  	for(let j=i+1; j<arr.length; j++) {
  		if(arr[i]>arr[j]) {
  			let temp = arr[i]
  			arr[i] = arr[j]
  			arr[j] = temp 
  		}
  	}
  }
  return arr.join('')
}