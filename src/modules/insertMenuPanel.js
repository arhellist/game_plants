
export function insertMenuPanel () {

    document.querySelector('.mainGameBox').insertAdjacentHTML(
        "afterbegin",`
        <div class="boxMenu">
        <div class="basketButton"></div>
        <div class="wateringButton"></div>
        <div class="boostButton"></div>
        </div>
        `);
}
