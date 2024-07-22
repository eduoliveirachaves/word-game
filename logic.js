const url = "https://words.dev-apis.com/word-of-the-day"

await function init() {
    fetch(url).then(res => res.json()).then(data => console.log(data));
}
