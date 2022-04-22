const apiCalls = {
  fetchData(url){ 
    return fetch(url)
      .then(response => response.json())

  }
}

export default apiCalls

// 'https://taylorswiftapi.herokuapp.com/get'
// curl --location --request GET 'https://shakespeare-quotes-generator.herokuapp.com/api/v1/quotes/single'