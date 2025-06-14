// script.js
let todos = [];
let todoIdCounter = 1;

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text === '') {
        alert('タスクを入力してください！');
        return;
    }
    
    const todo = {
        id: todoIdCounter++,
        text: text,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

// script.js に追加
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    
    const todoElement = document.querySelector(`[data-id="${id}"] .todo-text`);
    const originalText = todo.text;
    
    // 編集用のinput要素を作成
    const input = document.createElement('input');
    input.type = 'text';
    input.value = todo.text;
    input.className = 'edit-input';
    
    // 元のテキストを置き換え
    todoElement.replaceWith(input);
    input.focus();
    input.select();
    
    function saveEdit() {
        const newText = input.value.trim();
        if (newText === '') {
            // 空の場合は元に戻す
            todo.text = originalText;
        } else {
            todo.text = newText;
        }
        renderTodos();
    }
    
    function cancelEdit() {
        renderTodos(); // 元の状態に戻す
    }
    
    // イベントリスナー
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
    
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            cancelEdit();
        }
    });
    
    input.addEventListener('blur', saveEdit);
}

// renderTodos関数を更新
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', todo.id);
        
        li.innerHTML = `
            <span class="todo-text" ondblclick="editTodo(${todo.id})">${todo.text}</span>
            <div class="todo-actions">
                <button class="complete-btn" onclick="toggleTodo(${todo.id})">
                    ${todo.completed ? '戻す' : '完了'}
                </button>
                <button class="delete-btn" onclick="deleteTodo(${todo.id})">削除</button>
            </div>
        `;
        
        todoList.appendChild(li);
    });
}

// script.js に追加
let currentFilter = 'all';

function filterTodos(filter) {
    currentFilter = filter;
    
    // ボタンのアクティブ状態を更新
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTodos();
}

// renderTodos を更新
function renderTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';
    
    // フィルタリング
    let filteredTodos = todos;
    if (currentFilter === 'active') {
        filteredTodos = todos.filter(todo => !todo.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(todo => todo.completed);
    }
    
    filteredTodos.forEach(todo => {
        // ... 既存のレンダリングコード ...
    });
}

// Enterキーでタスク追加
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});