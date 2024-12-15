const {createApp, reactive, computed} = Vue;

// Affichagge par defaut-------------
const DEFAULT_SCREEN= {
    state:true,
    inputName:'',
    names:[],
    error:'',
    showError: false,
    result:''
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
                console.log(data.names);
                console.log(data.index);

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


        return {
            data,
            addNameTolist,
            isReady ,
            removeName 
            }
    }
}).mount('#app')