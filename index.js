const puppeteer = require("puppeteer")
const app = require("express")()
const PORT = 8080
let path = ""


async function screenshot(url, _callback) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    path = "screenshots/"+Date.now()+".png";
    try {
        await page.goto(url, {waitUntil: "networkidle0"})
        await page.screenshot({path: path, fullPage: true})
    } catch(err) {
        console.log(err.message)
    }
    await browser.close()
    _callback()
}

app.listen(PORT, "127.0.0.1", () => console.log("API started on http://127.0.0.1:"+PORT))
app.get("/", (req, res) => {
    res.status(400).send({"message":"insert a url"})
})
app.get("/:url", (req, res) => {
    const {url} = req.params;
    screenshot(url, () => res.status(200).send({
        "path": path
    }))
})
