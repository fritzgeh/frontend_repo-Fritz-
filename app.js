const express = require("express")

if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoader", () => {
    const itemInput = document.getElementById("itemInput")
    const addItemButton = document.getElementById("addItem")
    const itemsList = document.getElementById("itemsList")
    const logEnytry = []

    fetchItems()

    addItemButton.addEventListener("click", () => {
    const newItem = { name: itemInput.value }
    if (newItem.name) {
        addItem(newItem)
        logAction("User added new item")
        itemInput.value = ""
        }
    })

    function fetchItems () {
        fetch("/api/items")
        .then(response => response.Json())
        .then(items => {
            displayItems(items)
            logAction("Fetch items from API")
        })
        .catch(error => {
            console.error("Error fetching items:", error)
            logAction("Error fetching items from API")
        })
    }

    function displayItems () {
        itemsList.innerHTLM = ""
        items.forEach(item => {
            const li = document.createElement("li")
            li.innerHTLM = '<strong>${entry.timestamp}</strong>: ${entry.action} <button onclick="editLog(${index})">Edit</button>'
            itemsList.appendChild(logEnteryDiv)
        })
    }

    function addItem (item) {
        fetch("./api/items", { 
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(item)
        })
        .then(respond => respond.json())
        .then(newItem => {
            fetchItems ()
            logAction("Item added via API")
        })
        .catch(error => {
            console.error("Error adding items", error)
            logAction("Error adding items via API")
        })
    }

    window.editItem = function(id) {
        const newName = prompt("Enter new name")
        if (newName) {
            updateItem (id, {name: newName})
            logAction("User edited item with id ${id}")
        }
    }

    function updateItem () {
        fetch("/api/items/${id}", {
            methode: "PUT",
            headers: {
                "content-type": "application/Json"
            },
            body: JSON.stringify(updateItem)
        })
        .then(response => response.json())
        .then(() => {
            fetchItems()
            logAction("Items update via API")
        })
        .catch(error => {
            console.error("Error updating Item", error)
            logEnytry("Items update via API")
        })
    }

    window.deleteItem = function (id) {
        fetch("/api/item/${id}", {
            method: "DELETE"
        })
        .then(() => {
            fetchItems()
            logAction("User deleted item with id ${id}")
        })
        .catch(error => {
            console.error("Error deleting item", error)
            logAction("Error deleting item via APi")
        })
    }

    function logAction (action) {
        const timestamp = new Date().toLocaleString
        logEnytry.push( {action, timestamp} )
        displayLog()
    }

    function displayLog () {
        logDiv.innerHTLM = ""
        logEnytry.forEach((entry, index) => {
            const logEntryDiv = document.createElement("div")
            logEntryDiv.className = "log-entry"
            logEntryDiv.innerHTML = '<strong>${entry.timestamp}</strong>: ${entry.action} <button onclick="editLog(${index})">Edit</button>'
            logDiv.appendChild(logEntryDiv)
        })
    }

    window.editLog = function(index) {
        const newAction = prompt("Edit your log entry", logEnytry[index].action)
        if (newAction !== null && newAction.trim() !== "") {
            logEnytry[index].action = newAction
            displayLog()
        }
    }
})
}