import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize an empty board', () => {
    expect(component.board.length).toBe(9);
    expect(component.board.every(cell => cell === '')).toBeTrue();
  });

  it('should alternate players between X and O', () => {
    component.makeMove(0); // X
    expect(component.board[0]).toBe('X');
    component.makeMove(1); // O
    expect(component.board[1]).toBe('O');
  });

  it('should not allow overwriting a cell', () => {
    component.makeMove(0);
    component.makeMove(0); // should be ignored
    expect(component.board[0]).toBe('X'); // still X
  });

  it('should detect a winner', () => {
    component.board = ['X', 'X', '', '', '', '', '', '', ''];
    component.currentPlayer = 'X';
    component.makeMove(2); // X wins
    expect(component.winner).toBe('X');
  });

  it('should reset the game', () => {
    component.makeMove(0);
    component.winner = 'X';
    component.resetGame();
    expect(component.board.every(cell => cell === '')).toBeTrue();
    expect(component.winner).toBeNull();
    expect(component.currentPlayer).toBe('X');
  });
});
