// Har delat upp min kod i moduler då det ger:
// - bättre läsbarhet och struktur
// - kan återanvända koden på andra ställen istället för att duplicera
// - enklare hantera felsökning
// Hade kunnat delat upp mer av min kod men känns inte relevant i ett mindre projekt som detta.

// Först får vi ett anrop som sedan görs om till en body.
// När vi fått den kör vi getPlanets som först kollar på URL och sen om vi har en nyckel som skickas med.
// Stämmer nyckel får vi en lista på planeter.
// Får en ny nyckel varje gång vi kör, alltså ej hårdkodad.

export const getKey = async (apiType, endpoint) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        method: apiType
    }

    const bodiesData = await fetch(url, options)
    const bodiesDataJson = await bodiesData.json()

    console.log(bodiesDataJson);

    const planets = await getPlanets('POST', '/keys', bodiesDataJson.key)

    return bodiesDataJson.key
    
}

export const getPlanets = async (apiType, endpoint, key) => {
    const url = 'https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com' + endpoint

    const options = {
        method: apiType,
        headers: {
            'x-zocom': key
        }
    }

    const bodiesData = await fetch(url, options)
    const bodiesDataJson = await bodiesData.json()

    console.log(bodiesDataJson);

    return bodiesDataJson
}



 




