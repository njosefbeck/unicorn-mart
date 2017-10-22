# unicorn-mart

A proof of concept for an e-commerce store powered by [Contentful](https://contentful.com), [Gatsby.js](https://www.gatsbyjs.org), [Stripe](https://stripe.com/), [serverless](https://serverless.com/), [AWS Lambda](https://aws.amazon.com/lambda), and hosted by [Netlify](https://netlify.com).

## The Goal

I wanted to create a simple e-commerce solution that leverages the awesomeness that is static generators, while still giving clients a CMS to manage their inventory. My goal is always to get off of using WordPress whenever a CMS is required by a client. Bye bye WordPress!

## To Run

Of course you'll need to create accounts and download all the things you'll need to download to use the above services and tools. Once that's all set up, and you've cloned the repo:

1. Run ```npm install```.
2. In Contentful, create a ```Product``` content type. To run this example exactly as is, your content type should have six fields:
	* Name (short text)
	* Product Id (integer)
	* Price (integer)
	* Images (media, many files)
	* Colors (short text, list)
	* Sizes (short text, list)
3. Make a product in Contentful. Mine, of course, was a unicorn! The images are included as a zip file in this project. 
4. Make your own ```tokens.js``` file at the root of the project, and put your Contentful Space Id and Access Token there.
5. For the serverless, AWS Lambda function, I basically just used the code in [this repo](https://github.com/yosriady/serverless-stripe-backend). If you want to change the implementation, there's an accompanying [blog post](https://yos.io/2017/06/22/serverless-stripe/) to follow to set things up! In the front-end code, you'll just need to change the endpoint URL ('/charges') in cart.js to point to your own endpoint.

## What I Learned / Remaining Questions

First, though I love Contentful, it might have made more sense to handle inventory in Stripe itself. This way I could have treated it more easily as inventory, with specific stock, SKUs, etc. That beind said, I know there are ways to alter the data that gets stored in Contentful through their [Management API](https://www.contentful.com/developers/docs/references/content-management-api/), so I also could have leveraged that. An extension of this project would be to implement that functionality.

Second, I had challenges around keeping API keys private. Ultimately, since I had to use those keys in development and production, I came up with the ```tokens.js``` file solution as well as used Netlify's build-time environment variables as a way to seperate keys between run-times. It would have been nice to have been able to leverage Gatsby's ```.env.development```, but alas that only works on the code inside of ```/src``` (at the time of this writing).

Third, creating a Gatsby plugin to inject Stripe's Checkout JS library was surprisingly simple, thanks to the examples provided by Gatsby. Though it's a simple plugin, I'd like to create more examples and plugins that show how to implement all the Stripe capabilities into a Gatsby static site.

Fourth, serverless and AWS Lambda is fun, and super powerful! The Stripe server-side charge implementation is pretty much an exact copy of the code found in [this repo](https://github.com/yosriady/serverless-stripe-backend). Additionally, this [blog post](https://medium.com/@patrickmichelberger/building-a-serverless-e-commerce-app-with-aws-lambda-stripe-and-react-4663e241710b) was super inspiring.

Fourth, this project could be extended / improved in (I'm sure) a multitude of ways. Notably:

	* Implement Redux (mostly for funsies)
	* Use Contentful's [Management API](https://www.contentful.com/developers/docs/references/content-management-api/) to show how to decrease inventory and ultimately show if a product is 'sold out' on the front-end
	* Make a store with multiple products
	* Implement Stripe Elements instead of Stripe Checkout
	* Have the serverless AWS Lambda function e-mail a receipt to the customer and an order summary to me 

If you're interested in tackling any of these things, feel free to fork! Also, I'm sure my current code could use some refactoring or cleaning up. Feel free to fork and go wild! :) Any questions or comments, get in touch [via Twitter](https://twitter.com/njosefbeck)!
