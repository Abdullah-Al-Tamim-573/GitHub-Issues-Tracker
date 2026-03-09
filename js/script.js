
let allFilterBtn = document.getElementById("all-btn");
let openFilterBtn = document.getElementById("open-btn");
let closeFilterBtn = document.getElementById("closed-btn");

let displayDataArray = [];


let loadGithubIssuesData = async (command) => {
    let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
    let fetchIsseueResponse = await fetch(url);
    let issueData = await fetchIsseueResponse.json();


    openFilterBtn.classList.remove("btn-primary");
    closeFilterBtn.classList.remove("btn-primary");
    displayDataArray = issueData.data;
    dispalyGithubIssuesData();
    filterIssuesData(command, issueData.data);

}


let filterBoxesMainParent = document.getElementById("filter-boxes-main-parent");


let dispalyGithubIssuesData = () => {
    filterBoxesMainParent.innerHTML = "";
    displayDataArray.forEach(data => {
        
        let createBoxDiv = document.createElement("div");
        createBoxDiv.className = "box shadow-2xl border-t-5 border-t-[green]  space-y-2 rounded-lg";

        createBoxDiv.innerHTML = `
        <div class="py-6 px-7 space-y-4">
            <!-- ................................ 1-->
            <div class="flex justify-between">
              <img src="../assets/Open-Status.png" alt="Open Status" />
              <div
                class="badge badge-soft font-medium text-[12px] text-[#EF4444] bg-[#feecec] px-5 rounded-full"
              >
                High
              </div>
            </div>

            <!-- ................................ 2-->

            <div>
              <h4 class="text-[18px] font-semibold">
                Fix navigation menu on mobile devices
              </h4>
            </div>

            <!-- ................................ 3-->

            <div>
              <p class="text-[#64748B] text-[14px]">
                The navigation menu doesn't collapse properly on mobile
                devices...
              </p>
            </div>

            <!-- ................................ 4-->

            <div class="flex gap-1">
              <!-- 1st part -->
              <div>
                <div
                  class="badge badge-soft border-[#EF4444] font-medium  text-[#EF4444] bg-[#feecec] px-4 rounded-full"
                >
                  <img src="../assets/BugDroid.png" alt="BugDroid" />
                  <span class="text-[12px]">Bug</span>
                </div>
              </div>
              <!-- 2nd part -->
              <div>
                <div
                  class="badge badge-soft border-2 border-[#ffdd56] badge-warning rounded-full px-4  bg-[#fff8db]"
                >
                  <img src="../assets/Lifebuoy.png" alt="Lifebuoy" />
                  <span class="text-[12px]">help wanted</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ................................ 5-->
          <hr />
          <div class="px-5 space-y-1 py-2">
            <div class="text-[#64748B] text-[12px]">#1by john_doe</div>
            <div class="text-[#64748B] text-[12px]">1/15/2024</div>
          </div>
       
       `
       filterBoxesMainParent.appendChild(createBoxDiv)
      
    })
}


// {
//     "id": 49,
//     "title": "Add Google Analytics integration",
//     "description": "Integrate Google Analytics to track user behavior and improve product decisions.",
//     "status": "open",
//     "labels": [
//         "enhancement"
//     ],
//     "priority": "medium",
//     "author": "analytics_anna",
//     "assignee": "john_doe",
//     "createdAt": "2024-01-26T10:45:00Z",
//     "updatedAt": "2024-01-26T10:45:00Z"
// }

let filterIssuesData = (command, issueData) => {

    let filterBtns = document.querySelectorAll(".filter-btn");

    if (command === 'all') {
        filterBtns.forEach(btn => {
            btn.classList.remove("btn-primary");
        });
        
        allFilterBtn.classList.add("btn-primary");
        dispalyGithubIssuesData()
    }

    else if (command === 'open') {
        filterBtns.forEach(btn => {
            btn.classList.remove("btn-primary")
        });
        openFilterBtn.classList.add("btn-primary");

        let openDataFilter = displayDataArray.filter(data => data.status === command);
        displayDataArray = openDataFilter;
        dispalyGithubIssuesData()

    }
    else if (command === 'closed') {
        filterBtns.forEach(btn => {
            btn.classList.remove("btn-primary")
        });

        closeFilterBtn.classList.add("btn-primary");

        let closedDataFilter = displayDataArray.filter(data => data.status === command);
        displayDataArray = closedDataFilter;
        dispalyGithubIssuesData()
    }
}


loadGithubIssuesData()



