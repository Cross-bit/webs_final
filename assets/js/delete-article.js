

var ARTICLE_DELETE = (function (){

    var listItemsCollection = document.getElementById('articles-list-container').getElementsByClassName('article-item');
    var listItemsArr = Array.from(listItemsCollection);

    listItemsArr.forEach(item => {
        var deleteBtn = item.querySelector('.article-item-buttons button.article-delete-btn');

        if(deleteBtn != null){
            deleteBtn.addEventListener('click', OnDeleteArticle)
            deleteBtn.listItem = item;
        }
    });

    function OnDeleteArticle(evntData) {

        var listItem = evntData.currentTarget.listItem;

        var articleId = evntData.currentTarget.listItem.id;

        if(isNaN(articleId)) { 
            console.warn('id: ' + articleId + 'is not a numeric value!');
            return;
        }

        var location = window.location.href;

        var requestUrl = location + '?' + new URLSearchParams({ 
            method: 'DeleteArticle',
            id: articleId
        });

        fetch(requestUrl,{
            method: 'DELETE',
        }).then(response => response.text()).then(result => {
            console.log(result);
            listItem.remove();
        
            //UpdateArticleListCounter();
            PAGINATION.UpdateArticleListCounter();

        }).catch((errorMessage) => {
            console.error(errorMessage);
        });
    }
})();

