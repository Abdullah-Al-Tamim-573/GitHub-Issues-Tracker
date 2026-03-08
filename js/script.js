
let allFilterBtn = document.getElementById("all-btn");
let openFilterBtn = document.getElementById("open-btn");
let closeFilterBtn = document.getElementById("closed-btn");


let loadGithubIssuesData = async (command) => {
    let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    let fetchIsseueResponse = await fetch(url);
    let issueData = await fetchIsseueResponse.json();
     openFilterBtn.classList.remove("btn-primary")
     closeFilterBtn.classList.remove("btn-primary")
    filterIssuesData(command, issueData.data)
}



let filterIssuesData = (command, issueData) => {
    let filterBtns = document.querySelectorAll(".filter-btn");

    if (command === 'all') {
        filterBtns.forEach(btn => {
            btn.classList.remove("btn-primary")
        })

        allFilterBtn.classList.add("btn-primary");
    }
    else if (command === 'open') {
          filterBtns.forEach(btn => {
            btn.classList.remove("btn-primary")
        })
        openFilterBtn.classList.add("btn-primary")

    }
    else if (command === 'closed') {
        filterBtns.forEach(btn => {
            btn.classList.remove("btn-primary")
        })

        closeFilterBtn.classList.add("btn-primary")
    }
}

loadGithubIssuesData()



