const apiCalls = {
  fetchData(url){ 
    return fetch(url)
      .then(response => response.json())

  }
}

export default apiCalls
