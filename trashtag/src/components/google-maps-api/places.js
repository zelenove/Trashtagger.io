// Makes a request to the places API of google maps 
function placesRequest(map, func, request) {
    return new Promise((resolve, reject) => {
        const places = new window.google.maps.places.PlacesService(map);

        places[func](request, (results, status, pagination) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                resolve({
                    results: results,
                    pagination: pagination
                })
            } else {
                reject({
                    status: status,
                    results: results
                })
            }
        })
    })
}

export default placesRequest