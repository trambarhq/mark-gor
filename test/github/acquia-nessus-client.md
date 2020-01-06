# Nessus client

A ruby library and cli executable for commands on the Nessus 6 REST API.

This library is likely to be incomplete and cover only API calls essential
to Acquia's operational needs.

## Setup and verify

To use the cli executable, you should have the bundler gem and a current
ruby version (e.g. 2.1.x or 2.2.x). Run the following to start:
```
bundle install
bundle exec bin/nessus
```

## Nessus API Keys

The API key to call nessus is stored in a YAML file named *.nessus.yml*.
This will be loaded by default from from you home directory, but you
can have the commands look in another location by using the ```--home```
option.

The format of the file is as follows:
```
---
url: https://nessus.example.com
secretKey: abbdc5b62516
accessKey: 121abc435def
```

If you already have a web login to your Nessus server you may generate the file
by using:
```
bundle exec bin/nessus get-api-key NESSUS_URL
```

This needs to be called from a server that can access the /session path on
your Nessus server. It will prompt you for your password and create the
.nessus.yml file your home directory
(or the one specified by ```--home```).

*IMPORTANT:* Any previous API key you had will become invalid.

## Debugging

The client uses Excon, so you can get debug output from the request and response
by setting the environment variable ```EXCON_DEBUG```. For example:
```
EXCON_DEBUG=1 bundle exec bin/nessus scan list
```
