export const renderMembershipPage = ({ content }) => `<main id="main-content">
  <section class="section"><div class="container"><header class="section-header"><h1>${content.membership.title}</h1></header></div></section>
  <section class="section"><div class="container"><header class="section-header"><h2>Featured membership details</h2></header><div class="section-body"><article class="card"><p>${content.membership.intro}</p><h3>Benefits</h3><ul>${content.membership.benefits.map((benefit) => `<li>${benefit}</li>`).join('')}</ul><h3>How to Join</h3><p>${content.membership.joinInstructions}</p><button class="btn">Join This Season</button></article></div></div></section>
</main>`;
