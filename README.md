
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/yuyang-sun-2019/FYP_Project.git
git push -u origin main



git remote add origin https://github.com/yuyang-sun-2019/FYP_Project.git
git branch -M main
git push -u origin main

python -m http.server

git clone <url>
git add <file> or git add --all
git commit -m "<message>"
git push

git branch //to see all branches
git branch <branch Name>
git checkout <branch name>
git branch -d <branch name>

//remove the github branch
git push <remote-name> --delete <branch-name>
git push origin --delete test-branch

// merging
git checkout master
git pull origin master
git merge test
git push origin master

// git updates
git stash (so that u dont lose any changes somehow)
git pull origin main (get the latest changes from main branch)
git stash apply
