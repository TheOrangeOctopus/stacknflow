// Selectors

let closeloginDisplayDomEl = document.querySelector(".close-login")
let loginDisplayDomEl = document.querySelector(".login-button")
let loginDomEl = document.querySelector(".login-box")
let addInfoBtn = document.querySelector(".btn-stackInfo")
let addStepBtn = document.querySelector(".btn-addStep")
let editStackInfoBtn = document.querySelector(".btn-editStackInfo")
let saveStackBtn = document.querySelector(".save-stack")
let mainInfoDomEl = document.querySelector(".stack-mainInfo")
let stepDomEl = document.querySelector(".step-creation")
let sourceTypeDomEl = document.querySelector(".source-type")
let sourcesDomEl = document.querySelectorAll(".source")
let spotifySearchDomEl = document.querySelector(".spotify-search")
let bookSearchDomEl = document.querySelector(".book-search")
let youtubeBtn = document.querySelector(".insert-youtube")
let uploadStackPic = document.querySelector(".upload-image")
let uploadDoc = document.querySelector(".upload-document")
let uploadDocDomEl = document.querySelector(".file-source")
let stepsContainer = document.querySelector("#stepsContainer")
let logo = document.querySelector(".logo-wrapper")



/////// SORTABLE



logo.addEventListener("click",function(){
  window.location.href = "/stacks";
})
///// VIVUS

const myVivus = new Vivus('mainlogo', {
  type: 'scenario',
  duration: 100,
  start: 'autostart'
});

  setInterval(function(){
    myVivus
    .stop()
    .reset()
    .play(1)
  },10000)
  

// General Functions
function createHiddenInput(classOfParentDomEl,value,id){
  let parentDomEl = document.querySelector(`.${classOfParentDomEl}`)    
  let input = document.createElement("input")
      input.setAttribute(`type`,`hidden`)
      input.setAttribute(`id`,`${id}`)
      input.setAttribute(`value`,`${value}`)
      parentDomEl.appendChild(input)
}

function uploadPicture(inputID, destinationDomEl) {
 
  let uploadedImgDomEl = document.createElement("div")
  let img = document.createElement("img")
  let imgContainer = document.querySelector(`${destinationDomEl}`)
  let hiddenUrl = document.createElement("input")

  hiddenUrl.setAttribute("class", "img-source")
  hiddenUrl.setAttribute("type", "hidden")

  var formData = new FormData();
  var imagefile = document.querySelector(`${inputID}`)
  formData.append("image", imagefile.files[0])
  axios.post('uploadPicture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((imageUploaded) => {
    imgContainer.innerHTML = ""
    hiddenUrl.value = imageUploaded.data.url
    uploadedImgDomEl.appendChild(img)
    uploadedImgDomEl.appendChild(hiddenUrl)
    img.setAttribute(`src`, `${imageUploaded.data.url}`)
    imgContainer.appendChild(uploadedImgDomEl)
  })

}

function uploadDocument(inputID, destinationDomEl) {
  // Upload an image via axios and render instantly inside the destination DOM element.
  let uploadedDocDomEl = document.createElement("div")
  let img = document.createElement("img")
  let docContainer = document.querySelector(`${destinationDomEl}`)
  let hiddenUrl = document.createElement("input")
  let docName = document.createElement("p")

  hiddenUrl.setAttribute("class", "doc-source")
  hiddenUrl.setAttribute("type", "hidden")
  uploadedDocDomEl.setAttribute("class", "uploaded-document")

  var formData = new FormData();
  var documentfile = document.querySelector(`${inputID}`)
  formData.append("document", documentfile.files[0])
  axios.post('uploadDocument', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then((documentUploaded) => {
    docContainer.innerHTML = ""
    hiddenUrl.value = documentUploaded.data.url
    docName.innerHTML = documentUploaded.data.originalname
    uploadedDocDomEl.appendChild(img)
    uploadedDocDomEl.appendChild(docName)
    uploadedDocDomEl.appendChild(hiddenUrl)
    img.setAttribute(`src`, `/images/pdf-icon.png`)
    docContainer.appendChild(uploadedDocDomEl)
  })

}

function fadeInDOMEl(domEl, classToToggle, time) {
  domEl.setAttribute(`style`, `opacity:0;`)
  domEl.classList.toggle(classToToggle)
  setTimeout(function () { domEl.setAttribute(`style`, `opacity:100; transition:${time}ms`) }, time)

  setTimeout(() => { domEl.removeAttribute("style") }, time * 2);
}

function fadeOutDOMEl(domEl, classToToggle, time) {
  /* domEl.setAttribute(`style`, `opacity:100;`) */
  domEl.setAttribute(`style`, `opacity:0;transition:${time}ms;`)
  setTimeout(function () {
    domEl.classList.toggle(classToToggle)
  }, time)
  setTimeout(() => { domEl.removeAttribute("style") }, time * 2);
}

function toggleClass2DOMEl(domEl1, domEl2, classToToggle, time) {
  domEl1.setAttribute(`style`, `opacity:0; transition:${time}ms`)
  setTimeout(() => {
    domEl1.classList.toggle(classToToggle)
    domEl2.setAttribute(`style`, `opacity:0; transition:${time}ms`)
    domEl2.classList.toggle(classToToggle)
    setTimeout(function () { domEl2.setAttribute(`style`, `opacity:100; transition:${time}ms`) }, time)
  }, time);
  setTimeout(() => { domEl2.removeAttribute("style") }, time * 3);
}


//New Stack Functions

function loadInfoFromEditor() {
  //Falta hacer el img uploader y la petición del nombre de usuario
  let previewTitleDomEl = document.querySelector("#new-stack-title")
  let previewDescDomEl = document.querySelector("#new-stack-description")
  let previewFormTitleDomEl = document.querySelector("#title")
  let previewFormDescDomEl = document.querySelector("#description")
  let previewFormCategoryDomEl = document.querySelector("#category")
  let previewFormTagsDomEl = document.querySelector("#tags")
  let previewFormTimeDomEl = document.querySelector("#time")
  let previewFormImg = document.querySelector(".new-img-stack")
  let previewImgContainer = document.querySelector("#new-stack-image")
  
  //let previewFormCreatorDomEl = document.querySelector("#creator")

  let title = document.querySelector("#new-title").value
  let description = document.querySelector("#new-description").value
  let category = document.querySelector("#new-category").value
  let time = document.querySelector("#new-time").value
  let tags = document.querySelector("#new-tags").value
  let stackImgUrl = document.querySelector(".img-source")
  let stackImgUrlHidden = document.querySelector(".img-source")
  //let creator= document.querySelector("#new-creator").value
  previewTitleDomEl.innerHTML = title
  previewDescDomEl.innerHTML = description
  if (stackImgUrl !== null) {
    previewFormImg.setAttribute(`src`, `${stackImgUrl.value}`)
  }
  previewFormTitleDomEl.value = title
  previewFormDescDomEl.value = description
  previewFormCategoryDomEl.value = category
  previewFormTagsDomEl.value = tags
  previewFormTimeDomEl.value = time
  if (stackImgUrl !== null) {
    previewImgContainer.appendChild(stackImgUrlHidden)
  }

  // previewFormCreatorDomEl.value=creator
}

function loadStepFromEditor() {
  
  
  let newStepDomEl = document.createElement("div")
  let newStepTitleDomEl = document.createElement("h3")
  let newStepInstDomEl = document.createElement("p")
  let title = document.querySelector("#step-title").value
  let instructions = document.querySelector("#step-instructions").value
  let stepsContainerDomEl = document.querySelector("#stepsContainer")

  function spotifySourceLoader(container) {
    let sourceContainerDomEl = document.querySelector(".spotify-result")
    container.appendChild(sourceContainerDomEl)
    newStepDomEl.classList.add("src-spotify")
  }
  function youtubeSourceLoader(container) {
    let sourceContainerDomEl = document.querySelector(".youtube-video")
    container.appendChild(sourceContainerDomEl)
    newStepDomEl.classList.add("src-youtube")
  }
  function bookSourceLoader(container) { 
    let sourceContainerDomEl = document.querySelector(".books-result")
    container.appendChild(sourceContainerDomEl)
    newStepDomEl.classList.add("src-book")
  }
  function fileSourceLoader(container) {
    let sourceContainerDomEl = document.querySelector(".uploaded-document")
    container.appendChild(sourceContainerDomEl)
    newStepDomEl.classList.add("src-doc")
  }
  function linkSourceLoader(container) {
    let sourceContainerDomEl = document.createElement("div")
    let a = document.createElement("a")
    let link = document.querySelector("#link-url").value

    a.setAttribute("href", `${link}`)
    a.setAttribute("class", "link-url")
    a.innerHTML = link


    sourceContainerDomEl.appendChild(a)
    container.appendChild(sourceContainerDomEl)
    newStepDomEl.classList.add("src-link")
  }

  newStepDomEl.setAttribute("class", "new-step")
  newStepTitleDomEl.setAttribute("class", "new-step-title")
  newStepInstDomEl.setAttribute("class", "new-step-description")

  newStepTitleDomEl.innerHTML = title
  newStepInstDomEl.innerHTML = instructions

  newStepDomEl.appendChild(newStepTitleDomEl)
  newStepDomEl.appendChild(newStepInstDomEl)
  stepsContainerDomEl.appendChild(newStepDomEl)

  let sourceType = document.querySelector(".source-type")

  switch (sourceType.value) {
    case "link":
      linkSourceLoader(newStepDomEl)
      break;
    case "spotify":
      spotifySourceLoader(newStepDomEl)
      break;
    case "youtube":
      youtubeSourceLoader(newStepDomEl)
      break;
    case "book":
      bookSourceLoader(newStepDomEl)
      break;
    case "file":
      fileSourceLoader(newStepDomEl)
      break;
  }


}

function sendInfoToDB() {
  let title = document.querySelector("#new-stack-title").innerText
  let description = document.querySelector("#new-stack-description").innerText
  let category = document.querySelector("#category").value
  let tags = document.querySelector("#tags").value.split(",")
  let timeInHours = document.querySelector("#time").value
  let likesCounter = 0
  let createdBy = "Person to rellenar"
  let image = document.querySelector(".img-source").value
  let steps = []
  let stepsDomEl = document.querySelectorAll(".new-step")
  let hasMusic;
  let hasLink;
  let hasBook;
  let hasPdf;
  let hasVideo;


  stepsDomEl.forEach((step, idx) => {
    if (step.classList.value.includes("src-spotify")) {
      let SPsrcTitle = document.querySelector(".src-spotify > .new-step-title").innerText
      let SPsrcDesc = document.querySelector(".src-spotify > .new-step-description").innerText
      let SPSongTitle = document.querySelector(".spotify-title").innerText
      let SPSongArtist= document.querySelector(".spotify-artist").innerText;
      let SPuri = document.querySelector(".spotify-uri").value
      let step = {
        resource: "spotify",
        title: SPsrcTitle,
        instruction: SPsrcDesc,
        order: idx+1,
        url: SPuri,
        songName: SPSongTitle,
        songArtist: SPSongArtist
      }
      hasMusic = true
      steps.push(step)
    }
    if (step.classList.value.includes("src-youtube")) {
      let YBsrcTitle = document.querySelector(".src-youtube > .new-step-title").innerText
      let YBsrcDesc = document.querySelector(".src-youtube > .new-step-description").innerText
      let YBUrl = document.querySelector(".youtube-url").value
      let step = {
        resource: "youtube",
        title: YBsrcTitle,
        instruction: YBsrcDesc,
        order: idx+1,
        url: YBUrl
      }
      hasVideo = true
      steps.push(step)
    }
    if (step.classList.value.includes("src-link")) {
      let LKsrcTitle = document.querySelector(".src-link > .new-step-title").innerText
      let LKsrcDesc = document.querySelector(".src-link> .new-step-description").innerText
      let LKUrl = document.querySelector(".link-url").innerText
      let step = {
        resource: "link",
        title: LKsrcTitle,
        instruction: LKsrcDesc,
        order: idx+1,
        url: LKUrl
      }
      hasLink = true
      steps.push(step)
    }
    if (step.classList.value.includes("src-doc")) {
      let DCsrcTitle = document.querySelector(".src-doc > .new-step-title").innerText
      let DCsrcDesc = document.querySelector(".src-doc > .new-step-description").innerText
      let DCUrl = document.querySelector(".doc-source").value
      let DCName = document.querySelector(".uploaded-document > p").innerText
      let step = {
        resource: "doc",
        title: DCsrcTitle,
        instruction: DCsrcDesc,
        order: idx+1,
        url: DCUrl,
        docName: DCName
      }
      hasPdf = true
      steps.push(step)
    }
    ///// books
    if (step.classList.value.includes("src-book")) {
      let BKsrcTitle = document.querySelector(".src-book > .new-step-title").innerText
      let BKsrcDesc = document.querySelector(".src-book > .new-step-description").innerText
      let BKname = document.querySelector(".book-title").innerText
      let BKauthor= document.querySelector(".book-author").innerText;
      let BKurl = document.querySelector(".book-link").value
      let BKimg = document.querySelector(".book-image").value;
      let step = {
        resource: "book",
        title: BKsrcTitle,
        instruction: BKsrcDesc,
        order: idx,
        url: BKurl,
        bookName: BKname,
        bookAuthor: BKauthor,
        bookImage: BKimg
      }
      hasBook = true
      steps.push(step)
    }

    if (step.classList.value.includes("src-none")) {
      let NNsrcTitle = document.querySelector(".src-none > .new-step-title").innerText
      let NNsrcDesc = document.querySelector(".src-none > .new-step-description").innerText

      let step = {
        resource: "none",
        title: NNsrcTitle,
        instruction: NNsrcDesc,
        order: idx+1,
      }
      steps.push(step)
    }

  })


  let body = {
    title: title,
    description: description,
    category: category,
    tags: tags,
    timeInHours: timeInHours,
    likesCounter: likesCounter,
    createdBy: createdBy,
    image: image,
    steps: steps,
    hasMusic: hasMusic,
    hasBook: hasBook,
    hasVideo: hasVideo,
    hasLink: hasLink,
    hasPdf: hasPdf,
  }

  axios.post('/stacks/new', body)
    .then(response => {
      ;
    })
}

//Login Display Toggle
if(loginDisplayDomEl !== null){
  loginDisplayDomEl.addEventListener("click", function (e) {
    e.preventDefault()
    fadeInDOMEl(loginDomEl, "hidden", 150)
  })
  closeloginDisplayDomEl.addEventListener("click", function (e) {
    e.preventDefault()
    fadeOutDOMEl(loginDomEl, "hidden", 150)
  })
}

//New Stack Handlers
if(uploadStackPic !== null){
  new Sortable(stepsContainer, {
    animation: 150,
    ghostClass: 'ghost'
  });

  uploadStackPic.addEventListener("click", function (e) {
    e.preventDefault()
    uploadPicture("#stack-image", ".img-container")
  })

  uploadDoc.addEventListener("click", function (e) {
    e.preventDefault()
    uploadDocument("#selected-doc", ".file-source")
  })

  addInfoBtn.addEventListener("click", function (e) {
    e.preventDefault()
    toggleClass2DOMEl(mainInfoDomEl, stepDomEl, "hidden", 300)
    loadInfoFromEditor()
  })

  addStepBtn.addEventListener("click", function (e) {
    e.preventDefault()
    loadStepFromEditor()
  })

  editStackInfoBtn.addEventListener("click", function (e) {
    e.preventDefault()
    toggleClass2DOMEl(stepDomEl, mainInfoDomEl, "hidden", 300)
  })

  sourceTypeDomEl.addEventListener("change", function (e) {
    e.preventDefault()
    sourcesDomEl.forEach((e) => {
      e.classList.add("hidden")
    })
    document.querySelector(`.${sourceTypeDomEl.value}`).classList.toggle("hidden")
  })

  spotifySearchDomEl.addEventListener("click", function (e) {
    e.preventDefault()
    spotifySearch()
  })

  youtubeBtn.addEventListener("click", function (e) {
    e.preventDefault()
    youtubeLinkToEmbed()
  })

  bookSearchDomEl.addEventListener("click", function (e) {
    e.preventDefault()
    bookSearch()
  })

  saveStackBtn.addEventListener("click", function (e) {
    e.preventDefault()
    sendInfoToDB()
  })
}

////////////AXIOS & OTHER REQUESTS//////////

function spotifySearch() {
  let spotifyQuery = document.querySelector("#spotify-query").value
  let spotifyResults = document.querySelector(".spotify-results-list")
  axios.get(`http://localhost:3000/stacks/spotifyAPI/${spotifyQuery}`).then(songsFound => {

    spotifyResults.innerHTML = ""

    songsFound.data.forEach((song) => {
      let { artist } = song
      let { img } = song
      let uri = song.id

      let songInfoDomel = document.createElement("li")
      let sourceContainer = document.createElement("div")
      let imgContainer = document.createElement("div")
      let infoContainer = document.createElement("div")
      let titleDomel = document.createElement("p")
      let artistDomel = document.createElement("p")
      let imgDomel = document.createElement("img")
      let instDomel = document.createElement("span")
      let uriDomEl = document.createElement("input")

      uriDomEl.setAttribute("type","hidden")
      uriDomEl.setAttribute("class","spotify-uri")
      uriDomEl.setAttribute(`value`,`${uri}`)
      titleDomel.setAttribute("class","spotify-title")
      artistDomel.setAttribute("class","spotify-artist")
      imgContainer.appendChild(imgDomel)
      
      infoContainer.appendChild(titleDomel)
      infoContainer.appendChild(artistDomel)
      infoContainer.appendChild(instDomel)
      infoContainer.appendChild(uriDomEl)

      sourceContainer.appendChild(imgContainer)
      sourceContainer.appendChild(infoContainer)
      sourceContainer.setAttribute("class", "spotify-result")
      titleDomel.innerHTML = song.name
      artistDomel.innerHTML = artist[0].name
      imgDomel.setAttribute(`src`, `${img[0].url}`)
      instDomel.innerHTML = "Click to select this song"

      songInfoDomel.appendChild(sourceContainer)
      spotifyResults.appendChild(songInfoDomel)

    })
  }).then(() => {
    let spotifyResultsList = document.querySelectorAll(".spotify-results-list > li")
    spotifyResultsList.forEach((result) => {
      result.addEventListener("click", function () {
        result.classList.toggle("active")
        let otherResults = document.querySelectorAll(".spotify-results-list >li:not(.active)")
        otherResults.forEach((other) => {
          other.remove()
        })
      })
    })
  })

}


function youtubeLinkToEmbed() {
  let youtubeLink = document.querySelector("#youtube-link").value
  let youtubeCode = youtubeLink.substring(youtubeLink.length - 11)
  let youtubeEmbed = "https://www.youtube.com/embed/" + youtubeCode
  let sourceContainer = document.querySelector(".youtube-result")
  let youtubeContainer = document.createElement("div")
  let iframeYoutube = document.createElement("iframe")
  let youtubeHidden = document.createElement("input")

  youtubeHidden.setAttribute("type","hidden")
  youtubeHidden.setAttribute("class","youtube-url")
  youtubeHidden.setAttribute(`value`,`${youtubeEmbed}`)
  iframeYoutube.setAttribute(`src`, `${youtubeEmbed}`)
  youtubeContainer.setAttribute("class", "youtube-video")
  youtubeContainer.appendChild(iframeYoutube)
  youtubeContainer.appendChild(youtubeHidden)
  sourceContainer.appendChild(youtubeContainer)
}

////////////////////GOOGLE BOOKS
function bookSearch() {
  let booksQuery = document.querySelector("#books-query").value
  let booksResults = document.querySelector(".books-results-list")
  booksQuery = booksQuery.split(" ").join("%20")
  axios.get(`https://www.googleapis.com/books/v1/volumes/?q=${booksQuery}`).then(booksFound => {

    booksResults.innerHTML = ""
 
    booksFound.data.items.splice(0,4).forEach((book) => {
      
      let { volumeInfo } = book

      let bookInfoDomel = document.createElement("li")
      let sourceContainer = document.createElement("div")
      let imgContainer = document.createElement("div")
      let infoContainer = document.createElement("div")
      let titleDomel = document.createElement("p")
      let authorsDomel = document.createElement("p")
      let imgDomel = document.createElement("img")
      let instDomel = document.createElement("span")
      let linkDomEl = document.createElement("input")
      let imgHidden = document.createElement("input")

      imgHidden.setAttribute("type","hidden")
      imgHidden.setAttribute("class","book-image")
      imgHidden.setAttribute(`value`,`${volumeInfo.imageLinks.thumbnail}`)
      linkDomEl.setAttribute("type","hidden")
      linkDomEl.setAttribute("class","book-link")
      linkDomEl.setAttribute(`value`,`${volumeInfo.infoLink}`)
      titleDomel.setAttribute("class","book-title")
      authorsDomel.setAttribute("class","book-author")
      imgDomel.setAttribute("class", "book-img")
      imgContainer.appendChild(imgDomel)
      
      infoContainer.appendChild(imgHidden)
      infoContainer.appendChild(titleDomel)
      infoContainer.appendChild(authorsDomel)
      infoContainer.appendChild(instDomel)
      infoContainer.appendChild(linkDomEl)

      sourceContainer.appendChild(imgContainer)
      sourceContainer.appendChild(infoContainer)
      sourceContainer.setAttribute("class", "books-result")
      titleDomel.innerHTML = volumeInfo.title
      authorsDomel.innerHTML = volumeInfo.authors[0]
      if (volumeInfo.imageLinks){
      imgDomel.setAttribute(`src`, `${volumeInfo.imageLinks.thumbnail}`)
      } else {
        imgDomel.setAttribute(`src`, `https://islandpress.org/sites/default/files/400px%20x%20600px-r01BookNotPictured.jpg`)
      }
      instDomel.innerHTML = "Click to select this book"

      bookInfoDomel.appendChild(sourceContainer)
      booksResults.appendChild(bookInfoDomel)

    })
  }).then(() => {
    let booksResultsList = document.querySelectorAll(".books-results-list > li")
    booksResultsList.forEach((result) => {
      result.addEventListener("click", function () {
        result.classList.toggle("active")
        let otherResults = document.querySelectorAll(".books-results-list >li:not(.active)")
        otherResults.forEach((other) => {
          other.remove()
        })
      })
    })
  })

}

  