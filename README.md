# unicorn-mart

A proof of concept for an e-commerce store powered by [Contentful](https://contentful.com), [Gatsby.js](https://www.gatsbyjs.org), [Stripe](https://stripe.com/), [Clay](https://www.clay.run), and hosted by [Netlify](https://netlify.com).

**This project has been updated to use Gatsby v2**

**This project uses the [old version of Stripe Checkout](https://stripe.com/docs/checkout). For an updated e-commerce Gatsby + Stripe integration, see my project [dragon-mart](https://github.com/njosefbeck/dragon-mart).**

## The Goal

I wanted to create a simple e-commerce solution that leverages the awesomeness that is static generators, while still giving clients a CMS to manage their inventory. My goal is always to get off of using WordPress whenever a CMS is required by a client. Bye, bye WordPress!

## To Run

Of course, you'll need to create accounts and download all the things you'll need to download to use the above services and tools. Once that's all set up, and you've cloned the repo:

1. Run ```npm install```.
2. In Contentful, create a ```Product``` content type. To run this example exactly as is, your content type should have six fields:
	* Name (short text)
	* Product Id (integer)
	* Price (integer)
	* Images (media, many files)
	* Colors (short text, list)
	* Sizes (short text, list)
3. Make a product in Contentful. Mine, of course, was a unicorn! The images are included as a zip file in this project. 
4. Make your own ```.env``` file at the root of the project, and put your Contentful Space Id and Access Token there.
5. For Clay serverless function, I just used the code [here](https://www.clay.run/services/kareemclay/stripe-starter-function). If you want to change the implementation, feel free to fork what Kareem has and edit it! My version just returns a "success" object and doesn't do any charging. In the front-end code, you'll just need to change the endpoint URL in cart.js to point to your endpoint.

## What I Learned / Remaining Questions

First, though I love Contentful, it might have made more sense to handle inventory in Stripe itself. This way I could have treated it more easily as inventory, with specific stock, SKUs, etc. That being said, I know there are ways to alter the data that gets stored in Contentful through their [Management API](https://www.contentful.com/developers/docs/references/content-management-api/), so I also could have leveraged that. An extension of this project would be to implement that functionality.

Second, creating a Gatsby plugin to inject Stripe's Checkout JS library was surprisingly simple, thanks to the examples provided by Gatsby. I have since made two standalone Gatsby / Stripe plugins for implementing Stripe Checkout ([download on npm](https://www.npmjs.com/package/gatsby-plugin-stripe-checkout)) and Stripe Elements ([download on npm](https://www.npmjs.com/package/gatsby-plugin-stripe-elements)).

Third, going serverless with Clay was great! Such an awesome team, and such a great product. I especially like how easy it is, the logs, and the ability to easily copy and customize what others have done.

Fourth, this project could be extended/improved in (I'm sure) a multitude of ways. Notably:

* Implement Redux (mostly for funsies)
* Use Contentful's [Management API](https://www.contentful.com/developers/docs/references/content-management-api/) to show how to decrease inventory and ultimately show if a product is 'sold out' on the front-end
* Make a store with multiple products
* Implement Stripe Elements instead of Stripe Checkout
* Have the Clay serverless function e-mail a receipt to the customer and an order summary to me 

If you're interested in tackling any of these things, feel free to fork! Also, I'm sure my current code could use some refactoring or cleaning up. Feel free to fork and go wild! :) Any questions or comments, get in touch [via Twitter](https://twitter.com/njosefbeck)!
