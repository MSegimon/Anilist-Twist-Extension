async function getUrlsTwist(names1, progress1, callback) {
  let names = names1.concat();
  let progress = progress1.concat();

  let Urls = [];

  let specialChars = ":?!/\\[]%&'â.,・+ß|@#$=¿¡`^*´{}¨ç;<>";
  
  for (let i = 0; i < names.length; i++) {

    await $.post("https://zerosimple.net/projects/AnilistExtension/Extension/ajax.php", {
      cmd: "check",
      name: names[i]
    }, res => {
      //console.log(res);

        if (res == "09v82$&%425noifsiu") {
          if (names[i].indexOf("(") != -1) {

            if (names[i].indexOf(" (") != -1) {
              names[i] = names[i].substring(0, names[i].indexOf("(") - 1) + names[i].substring(names[i].indexOf(")") + 1, names[i].length);
            } else {
              names[i] = names[i].substring(0, names[i].indexOf("(")) + names[i].substring(names[i].indexOf(")") + 1, names[i].length);
            }

            //console.log(names[i]);
          }

          for (let j = 0; j < specialChars.length; j++) {

            if (names[i].indexOf(specialChars[j]) != -1) {

              names[i] = names[i].substring(0, names[i].indexOf(specialChars[j])) + names[i].substring(names[i].indexOf(specialChars[j]) + 1, names[i].length);

              //console.log(names[i]);

            }

          }

          //console.log(names[i]);

          while (names[i].indexOf(" ") != -1) {

            names[i] = names[i].replace(" ", "-");

            //console.log("boi");

          }

          //console.log(names[i]);
          //console.log(progress[i]);

          let epNum = parseInt(progress[i]) + 1;

          //console.log(epNum);

          Urls.push("https://twist.moe/a/" + names[i] + "/" + epNum.toString().trim());
          //console.log(Urls[i]);
        } else {
          let epNum = parseInt(progress[i]) + 1;
          Urls.push(res + epNum.toString().trim());
        }

        
    });
    console.log(Urls[i]);
    
    
  }

  //console.log(names);
  return Urls;
}

function getUrlsAnimeKisa(names1, progress1) {
  let names = names1.concat();
  let progress = progress1.concat();
  
  let Urls = [];

  for (let i = 0; i < names.length; i++) {

    //console.log(names[i]);

    while (names[i].indexOf(" ") != -1) {

      names[i] = names[i].replace(" ", "-");

      //console.log("boi");

    }

    //console.log(names[i]);
    //console.log(progress[i]);
    let epNum = parseInt(progress[i]) + 1;

    Urls.push("https://animekisa.tv/" + names[i] + "-episode-" + epNum.toString().trim());
    //console.log(Urls[i]);
  }

  //console.log(names);
  return Urls;
}

setTimeout(async function () {

  let bois = document.getElementsByClassName("media-preview-card");

  let names = [];
  let progress = [];

  for (let i = 0; i < bois.length; i++) {

    let lad = bois[i].parentElement.parentElement.firstChild.firstChild.innerText;

    //console.log(lad);

    if (lad == "Airing" || lad == "Anime in Progress") {
      
      let boi = bois[i].children[1].children;
      //console.log(boi);

      let name;

      if (boi.length == 2) {
        name = boi[0].innerText;
      } else if (boi.length == 3) {
        name = boi[1].innerText;
      }

      if (name[0] == " ") {
        names.push(null);
      } else {
        names.push(name);
      }

      //console.log(names[i]);

      let num;

      if (boi.length == 2) {
        num = boi[1].innerText;
      } else if (boi.length == 3) {
        num = boi[2].innerText;
      }
      let index = num.indexOf("Progress:");

      if (index == 0) {
        let string = num.substring(9, num.length);
        //console.log(string);

        let asd = string.indexOf("/");
        if (asd != -1) {
          string = string.substring(0, asd);
        }
        //console.log(string);

        progress.push(string);

      } else {
        progress.push(null);
      }

    //console.log(num);

    //console.log(test);

    }

    
  }

  //console.log(names);
  //console.log(progress);
  
  let TwistUrls = await getUrlsTwist(names, progress)
  
  //let AnimeKisaUrls = getUrlsAnimeKisa(names, progress);

  //console.log(TwistUrls);
  //console.log(AnimeKisaUrls);

  let buttons = [];
  buttons.length = bois.length;

  for (let i = 0; i < bois.length; i++) {

    let lad = bois[i].parentElement.parentElement.firstChild.firstChild.innerText;

    if (lad == "Airing" || lad == "Anime in Progress" || lad == "In Progress") {
      
      buttons[i] = document.createElement("a");
      buttons[i].innerHTML = "Twist";

      if (lad == "Anime in Progress" || lad == "In Progress") {
        if (bois[i].children[0].children.length == 1) {
          bois[i].children[0].children[0].children[0].appendChild(buttons[i]);
        } else {
          if (bois[i].children[0].children[1].children[0].children.length == 2) {
            bois[i].children[0].children[1].children[0].appendChild(buttons[i]);
          }
          
        }
        
      } else if (bois[i].children[0].children[1].children[0].children.length == 2 && lad == "Airing") {
        bois[i].children[0].children[1].children[0].appendChild(buttons[i]);
      }

      
      //bois[i].children[0].children[1].children[0].children[1].appendChild(buttons[i]);

      //console.log(bois[i].children[0].children[1].children[0].children.length);

      buttons[i].addEventListener("click", function () {
        window.open(TwistUrls[i]);
        window.location = "https://anilist.co/home"
      });

      buttons[i].classList.add("Twist-Buttons");
      


    }
    
    
  }



}, 2000);