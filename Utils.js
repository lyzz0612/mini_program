
const API_KEY = "166a059988b9403c9a90f6f653e8006e481a6"
const REST_DB_URL = "https://skyup-2eb8.restdb.io/rest"
const REST_DB_CODE2SESSION_URL = "https://skyup-2eb8.restdb.io/views/code2session"
function getFromDB(collection_name, condition) {
	let url = `${REST_DB_URL}/${collection_name}`
	if(condition) {
		url += `?q=${JSON.stringify(condition)}`
	}
	return new Promise((resolve) => {
		uni.request({
			method: "GET",
			url: url,
			header: {
				"x-apikey": API_KEY
			},
			success: (result) => {
				resolve(result.data)
			}
		})
	})
}

function insertToDB(collection_name, data) {
	let url = `${REST_DB_URL}/${collection_name}`
	return new Promise((resolve) => {
		uni.request({
			method: "POST",
			url: url,
			header: {
				"x-apikey": API_KEY
			},
			data: data,
			success: (result) => {
				console.log("insertToDB result", result)
				resolve(result.data)
			}
		})
	})
}
function saveToDB(collection_name, data) {
	if(!data["_id"]) {		
		return insertToDB(collection_name, data)
	}
	let url = `${REST_DB_URL}/${collection_name}/${data["_id"]}`
	return new Promise((resolve) => {
		uni.request({
			method: "PUT",
			url: url,
			header: {
				"x-apikey": API_KEY
			},
			data: data,
			success: (result) => {
				resolve(result.data)
			} 
		})
	}) 
}
function deleteFromDB(collection_name, data) {
	if(!data["_id"]) {
		return Promise.resolve({error: "no _id"})
	}
	let url = `${REST_DB_URL}/${collection_name}/${data["_id"]}`
	return new Promise((resolve) => {
		uni.request({
			method: "DELETE",
			url: url,
			header: {
				"x-apikey": API_KEY
			},
			success: (result) => {
				resolve(result.data)
			} 
		})
	}) 
}
function login() {
	return new Promise((resolve) => {
		uni.login({
			success: (res) => {
				let url = `${REST_DB_CODE2SESSION_URL}?appid=wxbdf69dee6e2f9589&code=${res.code}`
				uni.request({
					method: "GET",
					url: url,
					header: {
						"x-apikey": API_KEY
					},
					success: (result) => {
						resolve(result.data)
					},
					fail() {
						resolve({error: "get_openid_failed"})
					}
				})
			},
			fail() {
				resolve({error: "login_failed"})
			}
		})
	})
}
export default {
	getFromDB,
	insertToDB,
	saveToDB,
	deleteFromDB,
	login,
}