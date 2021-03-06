$(document).ready(function() {
    let commentDiv = document.querySelector('#commentDiv')
    getData()

    //listen for the clear event
    document.querySelector('#clear').addEventListener('click', () => {
        //alert('cl')
        document.querySelector('#usernameInput').value = ""
        document.querySelector('#commentInput').value = ""
    })


    //listen for form submission
    document.querySelector('#form').addEventListener('submit', (e) => {
        e.preventDefault()
        console.log(document.querySelector('#usernameInput').value)
        var data = {
            Username: document.querySelector('#usernameInput').value,
            Comment: document.querySelector('#commentInput').value
        }

        //call a ajax method to submit the data
        $.ajax({
            method: "POST",
            url: "https://localhost:44397/api/Reactions/PostReactions",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: function(resp) {
                //console.log(resp)
                //alert('Comment Posted')
                document.querySelector('#usernameInput').value = ""
                document.querySelector('#commentInput').value = ""
                getData()
            },
            error: function(resp) {
                console.log(resp)
                console.log("faild to post comment")
            }
        })
    })

    //listen for a delete action
    document.querySelector('#commentDiv').addEventListener('click', (e) => {
        //console.log(e)
        if (e.target.classList.contains("del")) {
            //alert('deleteing')
            if (e.target.classList.contains("fa-trash")) {
                //alert(e.target.id)
                deleteComment(e.target.id)
                return
            }
            //alert(e.target.id)
            deleteComment(e.target.id)
            return
        }
    })

    //listen for edit action
    document.querySelector('#commentDiv').addEventListener('click', (e) => {
            if (e.target.classList.contains("edit") || e.target.classList.contains("fa-pencil")) {
                alert('edit')
            }
        })
        // handle fetching user comments
    function getData() {
        $.ajax({
            method: 'GET',
            url: "https://localhost:44397/api/Reactions/GetReactions",
            success: function(resp) {
                console.log(resp)

                showCommentsOnUI(resp)
            },
            error: function(resp) {
                console.log('faled')
            }
        })
    }

    function deleteComment(id) {
        $.ajax({
            method: "GET",
            url: `https://localhost:44397/api/Reactions/Delete/?index=${id}`,
            success: function(resp) {
                console.log("Delete PAssed")
                getData()
            },
            error: function(resp) {
                console.log("Delete Failed")
            }

        })
    }

    function showCommentsOnUI(arr) {
        commentDiv.textContent = ""
        arr.forEach((data, i) => {
            let username = document.createElement('p')
            let timeSpan = document.createElement('span')
            let timeStamp = document.createElement('small')
            let comment = document.createElement('p')
            let divider = document.createElement('hr')
            let group = document.createElement('div')

            let edit = document.createElement('a')
            let editIcon = document.createElement('i')
            let del = document.createElement('a')
            let delIcon = document.createElement('i')

            //delete buttons
            //del.setAttribute("href", "#")
            del.setAttribute("id", i)
            del.classList.add("btn", "btn-sm", "btn-danger", "del")
            delIcon.classList.add("fa", "fa-trash", "del")
            delIcon.setAttribute("aria-hidden", "true")
            delIcon.setAttribute("id", i)
            del.appendChild(delIcon)

            //edit buttons
            edit.setAttribute("href", "#")
            edit.setAttribute("id", i)
            edit.classList.add("btn", "btn-sm", "btn-primary", "ml-1", "edit")
            editIcon.classList.add("fa", "fa-pencil")
            editIcon.setAttribute("aria-hidden", "true")
            edit.appendChild(editIcon)

            username.textContent = data["username"]
            timeStamp.textContent = " | " + data["time"]
            comment.textContent = data["comment"]

            timeSpan.appendChild(timeStamp)
            username.appendChild(timeSpan)
            group.appendChild(username)
                // add css classes
            username.classList.add("text-primary", "mb-0", "h6")
            timeStamp.classList.add("text-dark")
                //username.style.width = "50%"
            group.appendChild(comment)
            group.appendChild(del)
            group.appendChild(edit)
            group.appendChild(divider)

            commentDiv.append(group)
        })
    }

})