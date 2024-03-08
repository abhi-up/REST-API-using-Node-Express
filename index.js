const express = require("express")
const users = require("./MOCK_DATA.json")
const fs = require("fs")

const app = express()
const PORT = 8000

app.use(express.urlencoded({ extended: false }))

// HTML endpoint to display user first names
app.get("/users", (req, res) => {
    const html = `
    <ul>
        ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `
    res.send(html)
})

// REST API endpoint to get all users
app.get("/api/users", (req, res) => {
    return res.json(users)
})

// REST API endpoints for individual users
app.route("/api/users/:id")
    .get((req, res) => {
        // Get user by ID
        const id = Number(req.params.id)
        const user = users.find((user) => user.id === id)
        return res.json(user)
    })
    .delete((req, res) => {
        // Delete user by ID
        const id = Number(req.params.id)

        fs.readFile("./MOCK_DATA.json", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return res.status(500).json({ error: "Internal server error" })
            }

            let users = JSON.parse(data)
            const index = users.findIndex((user) => user.id === id)

            if (index === -1) {
                return res.status(404).json({ error: "User not found" })
            }

            // Remove user from array
            users.splice(index, 1)
            const modifiedData = JSON.stringify(users)

            // Write modified data back to file
            fs.writeFile("./MOCK_DATA.json", modifiedData, (err) => {
                if (err) {
                    console.error("Error writing file:", err)
                    return res
                        .status(500)
                        .json({ error: "Internal server error" })
                }
                return res.json({ status: `${id} deleted successfully` })
            })
        })
    })
    .patch((req, res) => {
        // Update user by ID
        const id = Number(req.params.id)
        const body = req.body

        fs.readFile("./MOCK_DATA.json", "utf8", (err, data) => {
            if (err) {
                console.error("Error reading file:", err)
                return res.status(500).json({ error: "Internal server error" })
            }

            let users = JSON.parse(data)
            const index = users.findIndex((user) => user.id === id)

            if (index === -1) {
                return res.status(404).json({ error: "User not found" })
            }

            // Merge request body with existing user object
            Object.assign(users[index], body)

            // Write modified data back to file
            fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
                if (err) {
                    console.error("Error writing file:", err)
                    return res
                        .status(500)
                        .json({ error: "Internal server error" })
                }
                return res.json({ status: "Success Patched" })
            })
        })
    })

// REST API endpoint to create a new user
app.post("/api/users", (req, res) => {
    const body = req.body
    users.push({ ...body, id: users.length + 1 })

    // Append new user to file
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        if (err) {
            console.error("Error writing file:", err)
            return res.status(500).json({ error: "Internal server error" })
        }
        return res.json({ status: "Success", id: users.length })
    })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`)
})
