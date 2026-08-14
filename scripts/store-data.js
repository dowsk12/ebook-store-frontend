export class Store {
  constructor(){
    this._data = [
      {id:1,title:'O Pequeno Príncipe',author:'Antoine de Saint-Exupéry',price:450,category:'fiction',image:'assets/books/book1.svg',summary:'Uma fábula poética sobre amizade e imaginação.'},
      {id:2,title:'O Alquimista',author:'Paulo Coelho',price:520,category:'fiction',image:'assets/books/book2.svg',summary:'A jornada de Santiago em busca do seu sonho e destino.'},
      {id:3,title:'Mindset',author:'Carol Dweck',price:650,category:'selfhelp',image:'assets/books/book3.svg',summary:'Como a mentalidade fixa ou de crescimento influencia o sucesso.'},
      {id:4,title:'O Poder do Hábito',author:'Charles Duhigg',price:750,category:'business',image:'assets/books/book4.svg',summary:'Como hábitos moldam nossas vidas e como mudá-los.'},
      {id:5,title:'Pai Rico, Pai Pobre',author:'Robert Kiyosaki',price:600,category:'business',image:'assets/books/book5.svg',summary:'Lições financeiras essenciais para enriquecer.'},
      {id:6,title:'1984',author:'George Orwell',price:580,category:'fiction',image:'assets/books/book6.svg',summary:'Distopia clássica sobre vigilância e poder.'}
    ];
  }
  list(){ return [...this._data]; }
}
