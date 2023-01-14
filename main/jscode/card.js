const card = Vue.createApp({});

card.component('card-component',{
    props: ['imageSrc','title','description','operating','ratings'],
    template: `
    <div class="card text-dark bg-light mb-3" style="max-width: 800px;">
        <div class="row g-0">
            <div class="col-md-5">
                <img :src=imageSrc class="img-fluid rounded-start" alt="...">
            </div>
            
            <div class="col-md-7">
                <div class="card-body">
                    <h5 class="card-title">{{title}}</h5>
                    <p class="card-text">Operating Hours {{operating}} <br /> Description: lor</p>
                    <p class="card-text"><small class="text-muted">Ratings: {{ratings}}</small></p>
                    <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                        <a href="#" class="btn btn-dark justify-content-md-end">Let's Go</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})

card.mount('#card')
