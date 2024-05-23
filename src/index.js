

import {main} from './modules/THREEjsModules/pot&Plant.module.js'
import {insertMenuPanel} from './modules/insertMenuPanel.js'

const mainGameBox = document.querySelector('.mainGameBox');



const inserMainScene = () =>{
  insertMenuPanel();
    main();
}

inserMainScene();