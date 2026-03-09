
let allFilterBtn = document.getElementById("all-btn");
let openFilterBtn = document.getElementById("open-btn");
let closeFilterBtn = document.getElementById("closed-btn");
let issuesCount = document.getElementById("issues-count")


let displayDataArray = [];


let loadGithubIssuesData = async (command) => {
  let url = "https://phi-lab-server.vercel.app/api/v1/lab/issues";
  let fetchIsseueResponse = await fetch(url);
  let issueData = await fetchIsseueResponse.json();


  openFilterBtn.classList.remove("btn-primary");
  closeFilterBtn.classList.remove("btn-primary");
  displayDataArray = issueData.data;
  dispalyGithubIssuesData();
  issuesCount.innerText = displayDataArray.length
  filterIssuesData(command, issueData.data);

}


let filterBoxesMainParent = document.getElementById("filter-boxes-main-parent");

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

let dispalyGithubIssuesData = () => {
  filterBoxesMainParent.innerHTML = "";
  let bugParent = document.getElementById("tags-parent");
  displayDataArray.forEach(data => {

    let { id, title, description, status, labels, priority, author, assignee, createdAt, updatedAt } = data;




    let formatedCreatedAt = new Date(createdAt).toLocaleDateString();
    let formatedupdatedAt = new Date(updatedAt).toLocaleDateString();
    let createBoxDiv = document.createElement("div");
    createBoxDiv.className = `
        box shadow-2xl border-t-5 ${status === 'open' ? 'border-t-[#00a96e]' : 'border-t-[#a755f6]'}  space-y-2 rounded-lg`;

    createBoxDiv.setAttribute(`onclick`, `loadBoxModal(${id})`)

    createBoxDiv.innerHTML = `
        <div class="py-6 px-7 space-y-4">
            <!-- ................................ 1-->
            <div class="flex justify-between">
              ${status === 'open' ?
        '<img src="../assets/Open-Status.png" alt="Open Status" />'
        : '<img src="../assets/Closed-Status.png" alt="Closed Status" />'}
              <div
                class="badge badge-soft font-medium text-[12px] text-[#EF4444] bg-[#feecec] px-5 rounded-full"
              >
                ${priority.toUpperCase()}
              </div>
            </div>

            <!-- ................................ 2-->

            <div>
              <h4 class="text-[18px] font-semibold">
                ${title}
              </h4>
            </div>

            <!-- ................................ 3-->

            <div>
              <p class="text-[#64748B] text-[14px] line-clamp-2">
                ${description}
              </p>
            </div>

            <!-- ................................ 4-->

            <div class="flex gap-1">
                   ${labels
        .map(label => `
              <span class="badge badge-soft font-medium text-[#EF4444] bg-[#feecec] border-[#EF4444] px-3 rounded-full text-[12px]">
                  ${label}
             </span>
       `).join("")
        }
            </div>

          <!-- ................................ 5-->
          <hr />
          <div class="px-5 space-y-1 py-3 flex justify-between items-center">
            <div>
                    <div class="text-[#64748B] text-[10px]">#1by ${author}</div>
                    <div class="text-[#64748B] text-[10px]">Assignee:${assignee ? assignee : 'no one'}</div>
                     
            </div>
            <div>
            <div class="text-[#64748B] text-[10px]">${formatedCreatedAt}</div>
            <div class="text-[#64748B] text-[10px]">Updated: ${formatedupdatedAt}</div>
                
            </div>
            
          </div>
       
       `
    filterBoxesMainParent.appendChild(createBoxDiv);






  })




}


// load card modal 

let loadBoxModal = async (id) => {
  let boxModalResponse = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  let boxModalData = await boxModalResponse.json();
  displayBoxModal(boxModalData.data)

}

// {
//     "id": 1,
//     "title": "Fix navigation menu on mobile devices",
//     "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//     "status": "open",
//     "labels": [
//         "bug",
//         "help wanted"
//     ],
//     "priority": "high",
//     "author": "john_doe",
//     "assignee": "jane_smith",
//     "createdAt": "2024-01-15T10:30:00Z",
//     "updatedAt": "2024-01-15T10:30:00Z"
// }

let displayBoxModal = (boxModalData) => {
  let { title, description, status, labels, priority, assignee, createdAt } = boxModalData
  let dialog = document.getElementById("my_modal_5");
  let createdAtFormatDate = new Date(createdAt).toLocaleDateString()
  dialog.innerHTML = `
             
              <div class="modal-box space-y-5 p-7">
              <div>
              
            <!-- 1st modal part -->
            <h3 class="text-[1.2rem] mb-[6px] md:text-[1.5rem] font-bold text-[#1F2937]">${title}</h3>
            <!-- 2nd modal part -->
            <div class="flex gap-2 items-center">
              <span class="font-medium text-white  ${status === 'open' ? 'bg-[#00A96E]' : 'bg-[#ef4320]'} text-[10px] px-2 rounded-full py-1">
                 ${status}
              </span>
              <ul class="flex gap-2 items-center">
                <li class="text-[11px] text-[#64748B] list-disc list-inside">
                Opened by <span>${assignee ? assignee : 'no one'}</span></li>
                <li class="text-[11px] text-[#64748B] list-disc list-inside">${createdAtFormatDate}</li>
              </ul>
            </div>
              </div>
            
            <!-- 3rd modal part -->
            <div class="flex gap-1 modal-badge-parent">
                      
            </div>
            <!-- 4th modal part -->
            <div class="text-[#64748B]">${description}</div>
               <!-- 5th modal part -->
                 <div class="flex justify-between items-center">
                        <!-- 1st part -->
                         <div >
                              <p class="text-[#64748B]">Assignee:</p>
                              <p class="font-semibold text-[#1F2937]">${assignee ? assignee : 'no one'}</p>
                         </div>

                         <!-- 2nd part -->
                         <div class='flex flex-col items-center gap-1'>
                            <p class="text-[#64748B]">Priority:</p>
                            <span class="text-[12px] px-5 py-1 text-white bg-[#ef4444] rounded-full">
                               ${priority.toUpperCase()}
                            </span>
                         </div>
                 </div>
              <!-- 6th modal part -->
              <div class="modal-action">
                <form method="dialog">
                  <!-- if there is a button in form, it will close the modal -->
                  <button class="btn btn-primary">Close</button>
                </form>
              </div>
          </div>
        
        `

        let modalBadgeParent = document.querySelector(".modal-badge-parent");
        labels.forEach(data => {
          let span = document.createElement("span");
          span.classList ="badge badge-soft border-[#EF4444] font-medium text-[#EF4444] bg-[#feecec] px-4 rounded-full";
          span.innerText = data;
          modalBadgeParent.appendChild(span);
        })
  dialog.showModal()
}



let filterIssuesData = (command, issueData) => {

  let filterBtns = document.querySelectorAll(".filter-btn");

  if (command === 'all') {
    filterBtns.forEach(btn => {
      btn.classList.remove("btn-primary");
    });

    allFilterBtn.classList.add("btn-primary");
    issuesCount.innerText = displayDataArray.length
    dispalyGithubIssuesData();

  }

  else if (command === 'open') {
    filterBtns.forEach(btn => {
      btn.classList.remove("btn-primary")
    });
    openFilterBtn.classList.add("btn-primary");

    let openDataFilter = displayDataArray.filter(data => data.status === command);
    displayDataArray = openDataFilter;
    issuesCount.innerText = displayDataArray.length
    dispalyGithubIssuesData()

  }
  else if (command === 'closed') {
    filterBtns.forEach(btn => {
      btn.classList.remove("btn-primary")
    });

    closeFilterBtn.classList.add("btn-primary");

    let closedDataFilter = displayDataArray.filter(data => data.status === command);
    displayDataArray = closedDataFilter;
    issuesCount.innerText = displayDataArray.length
    dispalyGithubIssuesData()
  }
}


loadGithubIssuesData()



