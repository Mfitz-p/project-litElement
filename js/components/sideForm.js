import {html, css, LitElement, nothing} from 'lit';
import {styles} from './styles';

export class SideForm extends LitElement {
  
  static styles = styles;

  static properties = {
    titleNewRecipe: {type: String}
  };

  constructor() {
    super();
    this.titleNewRecipe = 'New Recipe'
  }

  firstUpdated() {
    // Inicializar el side-form
    const forms = this.shadowRoot.querySelector('.side-form');
    M.Sidenav.init(forms, {edge: 'left'});
  }

  _openFormCard() {
    const forms = this.shadowRoot.querySelector('.side-form');
    const instance = M.Sidenav.getInstance(forms);
    instance.open();
  }

  _addNuevo() {
    const tituloInput = this.shadowRoot.querySelector('#title');
    const ingredientesInput = this.shadowRoot.querySelector('#ingredients');

    const titulo = tituloInput.value.trim();
    const ingredientes = ingredientesInput.value.trim();
    
    if (!titulo || !ingredientes) {
        alert("Llenar todos los campos del formulario.");
        return;
    }

    // (!titulo || !ingredientes) 
    //   ? alert("Llenar todos los campos del formulario.") 
    //   : nothing

    const newRecipe = {
    "src": "/img/pollo.png",
    "alt": "recipe thumb 1",
    "title": titulo,
    "ingredients": ingredientes,
    "deleteIcon": "delete_outline"        
    }

    this._dispatchEnvia(newRecipe)
    tituloInput.value = '';
    ingredientesInput.value = '';

    
  }

    _dispatchEnvia(newRecipe) {
      const event = new CustomEvent('evento-agregar', {
        detail: {newRecipe: newRecipe},
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  

  render() {
    return html`
    <link href="../../node_modules/materialize-css/dist/css/materialize.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="../../node_modules/materialize-css/dist/js/materialize.min.js"></script>
    

    <div class="center">
        <a class="btn-floating btn-small btn-large add-btn sidenav-trigger" @click="${this._openFormCard}" data-target="side-form">
        <i class="material-icons">add</i>
        </a>
    </div>

    <!-- add recipe side nav -->
  <div id="side-form" class="sidenav side-form">
    <form class="add-recipe container section">
      <h6>${this.titleNewRecipe}</h6>
      <div class="divider"></div>
      <label for="title" class="rTitle1">Recipe Title</label>
      <div class="input-field">
        <input placeholder="e.g. Ninja soup" id="title" type="text" class="validate">
      </div>
      <label for="ingredients">Ingredients</label>
      <div class="input-field">
        <input placeholder="e.g. Tofu, mushroom, garlic" id="ingredients" type="text" class="validate">
      </div>
      <div class="input-field center">
        <button type="button" class="btn-small" @click=${this._addNuevo}>Add</button>
      </div>
    </form>
  </div>

    `;
    
  }
}
customElements.define('side-form', SideForm);