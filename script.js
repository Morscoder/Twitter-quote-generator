

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById(`loader`) ;

//-------------------loading spanner show -----------------------//
function showloading() {
  loader.hidden = false ;
  quoteContainer.hidden = true ;
}
//-------------------------Remove loading show----------------//
function removeloading() {
 if(!loader.hidden) {
   quoteContainer.hidden = false ;
   loader.hidden = true ;
 }
}
//------------------------------Get Quote from API----------------//
async function getQuote() {
    showloading() ;
    //------to avoid cros error , Use a proxy URL ----------//
       const proxyUrl = 'https://shrouded-lowlands-05894.herokuapp.com/';
       const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
       try {
             const response = await fetch(proxyUrl + apiUrl);
             const data = await response.json();
             //--- Check if Author field is blank and replace it with 'Unknown'--//
             if (data.quoteAuthor === "") {
             authorText.innerText = "Unknow" ;
            }
            else{
            authorText.innerText = data.quoteAuthor ;
                }
                // Dynamically reduce font size for long quotes---//
            if (data.quoteText.length > 100) {
               quoteText.classList.add(`long-quote`) ;
             }
             else {
             quoteText.classList.remove(`long-quote`);
             }
      quoteText.innerText = data.quoteText;
      //-----STOP LOADING  ----//
      removeloading() ;
    } catch (error) {
      console.log("oopss!! error" , error)
    }
  }
//-----------------------Tweet Quote-------------//
function tweetQuote(){
  const quote = quoteText.innerText ;
  const author = authorText.innerText ;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}` ;
  window.open (twitterUrl, `_blank`);
}

//-------------Event Listener-------------//
newQuoteBtn.addEventListener(`click` , getQuote);
twitterBtn.addEventListener(`click` , tweetQuote);
//-----------------ON LOAD---------------//
getQuote();