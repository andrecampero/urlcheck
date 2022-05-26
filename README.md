### URL Check
Utilizado PHP, Laravel, JS, Html, CSS, Bootstrap, Mysql e Linux

#### Instalação
1. Instalar dependências do composer:
`php composer install`

2. Gerar API KEY Laravel
`php artisan key:generate`

3. Executar script Mysql em /database/scripts/url.sql

4. Apontar em .env e /cron/conn.php credenciais de acesso ao DB

5. Configuração CRON
`crontab -e`
`* * * * * php servidor/cron/urlcheck.php`
