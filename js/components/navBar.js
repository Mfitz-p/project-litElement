import {html, css, LitElement} from 'lit';
import {styles} from '../components/styles';

export class NavBar extends LitElement {
  
  static styles = styles;

  static properties = {
    title: {type: String},
    secondTitle: {type: String}
  };

  constructor() {
    super();
    this.title = 'Food'
    this.secondTitle = 'Ninja'
  }

  firstUpdated(){
    // Inicializar el side-menu
    const menus = this.renderRoot.querySelector('.side-menu');
    M.Sidenav.init(menus, {edge: 'right'});
  }

  _openSideBar(){
    const menus = this.renderRoot.querySelector('.side-menu');
    const instance = M.Sidenav.getInstance(menus);
    instance.open();
  }


  render() {
    return html`
    <link href="../../node_modules/materialize-css/dist/css/materialize.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <script src="../../node_modules/materialize-css/dist/js/materialize.min.js"></script>
    
    <nav class="z-depth-0">
        <div class="nav-wrapper container">
        <a href="/">${this.title}<span>${this.secondTitle}</span></a>
        <span class="right grey-text text-darken-1">
            <i class="material-icons sidenav-trigger" data-target="side-menu" @click="${this._openSideBar}">menu</i>
        </span>
        </div>
    </nav>

    <ul id="side-menu" class="sidenav side-menu">
        <li><a class="subheader">FOODNINJA</a></li>
        <li><a href="/" class="waves-effect">Home</a></li>
        <li><a href="/pages/about.html" class="waves-effect">About</a></li>
        <li><div class="divider"></div></li>
        <li><a href="/pages/contact.html" class="waves-effect">
        <i class="material-icons">mail_outline</i>Contact</a>
        </li>
    </ul>
    <slot></slot>
    `;
    
  }
}
customElements.define('nav-bar', NavBar);