const {createApp, reactive, computed} = Vue;

// Affichagge par defaut-------------
const DEFAULT_SCREEN= {
    state:true,
    inputName:'',
    names:[],
    error:'',
    showError: false,
    result:[]
}
createApp({
    setup(){
        const data = reactive(DEFAULT_SCREEN)
        
        // computed
        const isReady = computed(()=>
            {
                return data.names.length > 1;
            })
        const addNameTolist = ()=>{
            const userName = data.inputName.trim()

            if(validation(userName)){
                data.names.push(userName)
                data.showError = false
                data.inputName = "";
            }
            else{
                data.showError =true

            }
     
        }
        const removeName =(value)=>{
            data.names.splice(value)
        }
        
        const validation = (value)=>{
            data.error = '';
            if (value =='' || value.length <=1){
                data.error = 'Veuillez-saisir un nom avec minimum deux lettres.';
                return false
            }
            if(data.names.some(name => name.toLowerCase() ===
             value.toLowerCase())){
                data.error = 'Le nom doit être unique .';
                return false
            }
            return true
        }
        const generateResult = (array) => {
            // L'algorithme de Fisher-Yates (ou Knuth Shuffle), qui est une méthode
            //  efficace pour mélanger aléatoirement les éléments d'un tableau
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        
        };
        
        const ShowResult = ()=>{
            generateResult(data.names)
            data.state = false;
        }


       
        const recommecer = ()=>{
            data.state=true;
            data.inputName='';
            data.names=[];
            data.error='';
            data.showError= false;
            data.result=[]
        }

        return {
            data,
            addNameTolist,
            isReady ,
            removeName,
            ShowResult,
            recommecer,
            }
    }
}).mount('#app')