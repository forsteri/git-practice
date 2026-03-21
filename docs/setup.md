# 環境構築

## Gitのインストール

=== "macOS"

    Homebrewでインストールします。

    ```bash
    brew install git
    ```

    Xcodeをインストール済みであれば、Gitも含まれています。

=== "Windows"

    wingetでインストールします。

    ```powershell
    winget install Git.Git
    ```

    インストール後、ターミナルを再起動してください。

=== "Linux (Ubuntu/Debian)"

    ```bash
    sudo apt update && sudo apt install git
    ```

インストール確認：

```bash
git --version
# git version 2.x.x と表示されればOK
```

---

## 初期設定

Gitを使い始める前に、**名前**と**メールアドレス**を設定します。
これはcommit（変更の記録）に「誰が変更したか」を残すために必要です。

```bash
git config --global user.name "自分の名前"
git config --global user.email "自分のメールアドレス"
```

設定の確認：

```bash
git config --global --list
```

!!! tip "globalとは"
    `--global` をつけると、このPC上の全てのリポジトリに適用されます。
    特定のリポジトリだけ別の設定にしたい場合は、そのリポジトリ内で `--global` なしで実行します。

---

## CodeCommitへの接続設定

リモートリポジトリとしてAWS CodeCommitを使います。

### 前提

- AWS CLIがインストール・設定済みであること
- CodeCommitへのアクセス権限を持つIAMユーザーがあること

### 認証ヘルパーの設定

CodeCommitへの接続には、AWS CLIの認証情報を使う方法が簡単です。

```bash
git config --global credential.helper '!aws codecommit credential-helper $@'
git config --global credential.UseHttpPath true
```

これで、`git push` や `git pull` 時にAWS CLIの認証情報が自動的に使われます。

### 接続テスト

CodeCommit上にテスト用リポジトリを作成し、cloneできることを確認します。

```bash
git clone https://git-codecommit.ap-northeast-1.amazonaws.com/v1/repos/リポジトリ名
```

!!! note "リージョンについて"
    上記は東京リージョン（ap-northeast-1）の例です。利用するリージョンに合わせて変更してください。

---

次のセクション: [基本操作 ローカル編](basic-local.md)
