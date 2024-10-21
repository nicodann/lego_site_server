export default async (url:string) => {
  try {
    fetch(url).then((res) => {
      console.log("The page:",res)
    })
  } catch (err) {
    console.error(`We ran into the following error: ${err}`)
  }
}