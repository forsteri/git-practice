// script.js
let todos = [];
let todoIdCounter = 1;

/**
 * 新しいタスクを入力欄から追加します。
 *
 * 入力が空の場合は警告を表示し、追加を中止します。追加後は入力欄をクリアし、タスクリストを再描画します。
 */
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

/**
 * 指定したIDのToDo項目の完了状態を切り替え、リストを再描画します。
 *
 * @param {number} id - 完了状態を切り替えるToDo項目のID。
 */
function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}

/**
 * 指定されたIDのToDoをリストから削除し、表示を更新します。
 *
 * @param {number} id - 削除するToDoの一意なID。
 */
function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
}

/**
 * 指定したIDのToDo項目をインラインで編集できるようにする。
 *
 * 対象のToDoテキストを入力フィールドに置き換え、編集後にEnterキーまたはフォーカスが外れた際に保存し、Escapeキーで編集をキャンセルします。
 *
 * @param {number} id - 編集対象のToDo項目のID。
 */
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
    
    /**
     * 編集中のToDoテキストを保存し、リストを再描画します。
     *
     * 入力が空の場合は元のテキストに戻し、空でなければ新しいテキストに更新します。
     */
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
    
    /**
     * 編集中の操作をキャンセルし、ToDoリストの表示を元の状態に戻します。
     */
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

/**
 * 現在のToDoリストをDOMに描画し、各タスクの状態や操作ボタンを反映します。
 *
 * ToDoの完了状態や編集・削除・切り替え操作に応じて、リスト表示を最新の状態に更新します。
 */
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

// Enterキーでタスク追加
document.getElementById('todoInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
});