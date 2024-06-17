import {html, css, LitElement} from 'lit';
import {styles} from '../components/styles';

export class RecipesCards extends LitElement {
  
  static styles = styles;

  static properties = {
    cardsRecipes : {type: Array}
  };

  constructor() {
    super();
    this.cardsRecipes = [
      {
        "src": "/img/dish.png",
        "alt": "recipe thumb 1",
        "title": "Edame Noodles",
        "ingredients": "Edame Beans, Noodles, Garlic oil",
        "deleteIcon": "delete_outline"
      },
      // {
      //   "src": "/img/pollo.png",
      //   "alt": "recipe thumb 2",
      //   "title": "Chicken Curry",
      //   "ingredients": "Chicken, Curry Sauce, Rice",
      //   "deleteIcon": "delete_outline"
      // },
      {
        "src": "/img/vegetales.png",
        "alt": "recipe thumb 3",
        "title": "Vegetable Stir Fry",
        "ingredients": "Broccoli, Bell Peppers, Soy Sauce",
        "deleteIcon": "delete_outline"
      },
      {
        "src": "/img/tacos.png",
        "alt": "recipe thumb 4",
        "title": "Beef Tacos",
        "ingredients": "Beef, Tortilla, Lettuce, Cheese",
        "deleteIcon": "delete_outline"
      },
      {
        "src": "/img/sushi.png",
        "alt": "recipe thumb 5",
        "title": "Salmon Sushi",
        "ingredients": "Salmon, Rice, Nori, Wasabi",
        "deleteIcon": "delete_outline"
      }
    ]
  }


  _deleteCard(event) {
    const index = event.currentTarget.getAttribute('value');
    this.cardsRecipes.splice(index, 1);
    this.requestUpdate();
    //console.log('event.currentTarget del index: ', index)
   }

   _dispatchRecibe(e) {
    if (e.detail) {
        this.cardsRecipes.push(e.detail.newRecipe);
        this.requestUpdate();
    }
   }

  render() {
    return html`
    <link href="../../node_modules/materialize-css/dist/css/materialize.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="../../node_modules/materialize-css/dist/js/materialize.min.js"></script>

    <div class="recipes container grey-text text-darken-1">
      ${this.cardsRecipes.map((recipe, index) => html`
        <div class="card-panel recipe white row">
          <img src="${recipe.src}" alt="${recipe.alt}">
          <div class="recipe-details">
            <div class="recipe-title">${recipe.title}</div>
            <div class="recipe-ingredients">${recipe.ingredients}</div>
          </div>
          <div class="recipe-delete">
            <i class="material-icons" value = ${index}  @click=${this._deleteCard}>${recipe.deleteIcon}</i>
          </div>
        </div>
      `)}
    </div>
    <div @evento-agregar = ${this._dispatchRecibe}>
      <slot></slot>
    </div>
    `;
    
  }
}
customElements.define('recipes-card', RecipesCards);