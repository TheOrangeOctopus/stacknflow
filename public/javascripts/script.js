// Selectors

let closeLoginDisplay = document.querySelector(".close-login")
let loginDisplay = document.querySelector(".login-button")
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
let youtubeBtn = document.querySelector(".insert-youtube")
let uploadStackPic = document.querySelector(".upload-image")
let uploadDoc = document.querySelector(".upload-document")
let uploadDocDomEl = document.querySelector(".file-source")

// General Functions
function uploadPicture(inputID, destinationDomEl) {
  // Upload an image via axios and render instantly inside the destination DOM element.
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
  let stepsContainerDomEl = document.querySelector(".steps-list")
  let newStepDomEl = document.createElement("li")
  let newStepTitleDomEl = document.createElement("h2")
  let newStepInstDomEl = document.createElement("p")
  let title = document.querySelector("#step-title").value
  let instructions = document.querySelector("#step-instructions").value

  function spotifySourceLoader(container) {
    let spotifyQueryDomEl = document.querySelector("#spotify-query")
    let sourceContainerDomEl = document.createElement("div")
    let sourceDomEl = document.querySelector(".spotify-result")
    sourceContainerDomEl.setAttribute("Class", "step-source")
    sourceContainerDomEl.appendChild(sourceDomEl)
    container.appendChild(sourceContainerDomEl)
    spotifyQueryDomEl.value = ""
    newStepDomEl.classList.add("src-spotify")
  }
  function youtubeSourceLoader(container) {
    let sourceContainerDomEl = document.querySelector(".youtube-video")
    container.appendChild(sourceContainerDomEl)
    newStepDomEl.classList.add("src-youtube")
  }
  function bookSourceLoader(container) { }
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

  //works but need to be implemented
  stepsDomEl.forEach((step, idx) => {
    step.classList.value.includes("src-spotify") ? console.log("SPOTIFY"):null
    step.classList.value.includes("src-youtube") ? console.log("YOUTUBE"):null
    step.classList.value.includes("src-link") ? console.log("LINK"):null

    step.classList.value.includes("src-doc") ? console.log("DOC"):null

  })


  let body = {
    title: title,
    description: description,
    category: category,
    tags: tags,
    timeInHours: timeInHours,
    likesCounter: likesCounter,
    createdBy: createdBy,
    image: image
    // steps: [{
    //   title : String,
    //   instruction: String,
    //   resource: String,
    //   //resource: [{type: Schema.Types.ObjectId,ref: "Resources"}],
    //   timeInMinutes: Number,
    //   order:Number,
    //    }],
    //   hasMusic: Boolean,
    //   hasBook: Boolean ,
    //   hasVideo: Boolean,
    //   hasLink: Boolean,
    //   hasPdf: Boolean,
  }

  axios.post('/stacks/new', body)
    .then(response => {
      console.log('post successful and the response is: ', response.data);
    })
}

//Login Display Toggle
loginDisplay.addEventListener("click", function (e) {
  e.preventDefault()
  fadeInDOMEl(loginDomEl, "hidden", 150)
  /* loginDomEl.classList.toggle("hidden") */
})
closeLoginDisplay.addEventListener("click", function (e) {
  e.preventDefault()
  fadeOutDOMEl(loginDomEl, "hidden", 150)
})

//New Stack Handlers
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

saveStackBtn.addEventListener("click", function (e) {
  e.preventDefault()
  sendInfoToDB()
})



////////////AXIOS & OTHER REQUESTS//////////

function spotifySearch() {
  let spotifyQuery = document.querySelector("#spotify-query").value
  let spotifyResults = document.querySelector(".spotify-results-list")
  axios.get(`http://localhost:3000/stacks/spotifyAPI/${spotifyQuery}`).then(songsFound => {

    spotifyResults.innerHTML = ""

    songsFound.data.forEach((song) => {
      let { artist } = song
      let { img } = song

      let songInfoDomel = document.createElement("li")
      let sourceContainer = document.createElement("div")
      let imgContainer = document.createElement("div")
      let infoContainer = document.createElement("div")
      let titleDomel = document.createElement("p")
      let artistDomel = document.createElement("p")
      let imgDomel = document.createElement("img")
      let instDomel = document.createElement("span")

      imgContainer.appendChild(imgDomel)
      infoContainer.appendChild(titleDomel)
      infoContainer.appendChild(artistDomel)
      infoContainer.appendChild(instDomel)
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
  iframeYoutube.setAttribute(`src`, `${youtubeEmbed}`)
  youtubeContainer.setAttribute("class", "youtube-video")
  youtubeContainer.appendChild(iframeYoutube)
  sourceContainer.appendChild(youtubeContainer)
}



/////// SORTABLE

new Sortable(stepsContainer, {
  animation: 150,
  ghostClass: 'ghost'
});