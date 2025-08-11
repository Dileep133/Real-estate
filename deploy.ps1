# Elite Realty - Azure Deployment Script
# Run this script to quickly set up Azure resources for deployment

param(
    [Parameter(Mandatory=$true)]
    [string]$AppName,
    
    [Parameter(Mandatory=$false)]
    [string]$ResourceGroup = "elite-realty-rg",
    
    [Parameter(Mandatory=$false)]
    [string]$Location = "East US",
    
    [Parameter(Mandatory=$false)]
    [string]$PlanName = "elite-realty-plan"
)

Write-Host "🚀 Elite Realty Azure Deployment Setup" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green

# Check if Azure CLI is installed
try {
    az --version | Out-Null
    Write-Host "✅ Azure CLI found" -ForegroundColor Green
}
catch {
    Write-Host "❌ Azure CLI not found. Please install it first." -ForegroundColor Red
    Write-Host "Download from: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli" -ForegroundColor Yellow
    exit 1
}

# Login to Azure
Write-Host "🔐 Logging into Azure..." -ForegroundColor Yellow
az login

# Create Resource Group
Write-Host "📁 Creating Resource Group: $ResourceGroup" -ForegroundColor Yellow
az group create --name $ResourceGroup --location $Location

# Create App Service Plan
Write-Host "📋 Creating App Service Plan: $PlanName" -ForegroundColor Yellow
az appservice plan create --name $PlanName --resource-group $ResourceGroup --sku FREE --location $Location

# Create Web App
Write-Host "🌐 Creating Web App: $AppName" -ForegroundColor Yellow
az webapp create --resource-group $ResourceGroup --plan $PlanName --name $AppName --runtime "NODE|18-lts"

# Configure deployment source (if git repository exists)
if (Test-Path ".git") {
    Write-Host "📦 Configuring deployment source..." -ForegroundColor Yellow
    $gitUrl = git config --get remote.origin.url
    if ($gitUrl) {
        Write-Host "🔗 Git repository found: $gitUrl" -ForegroundColor Green
        # Note: You'll need to configure this manually in Azure DevOps
    }
}

# Display results
Write-Host ""
Write-Host "✅ Deployment setup complete!" -ForegroundColor Green
Write-Host "=============================" -ForegroundColor Green
Write-Host "🌐 Web App URL: https://$AppName.azurewebsites.net" -ForegroundColor Cyan
Write-Host "📁 Resource Group: $ResourceGroup" -ForegroundColor Cyan
Write-Host "📋 App Service Plan: $PlanName" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Set up Azure DevOps pipeline using azure-pipelines.yml" -ForegroundColor White
Write-Host "2. Configure service connection in Azure DevOps" -ForegroundColor White
Write-Host "3. Update pipeline variables with your app name: $AppName" -ForegroundColor White
Write-Host "4. Push your code to trigger deployment" -ForegroundColor White
Write-Host ""
Write-Host "📖 Full guide available in DEPLOYMENT-GUIDE.md" -ForegroundColor Green

# Optional: Open Azure Portal
$response = Read-Host "🌐 Open Azure Portal to view resources? (y/n)"
if ($response -eq 'y' -or $response -eq 'Y') {
    Start-Process "https://portal.azure.com/#@/resource/subscriptions/$(az account show --query id -o tsv)/resourceGroups/$ResourceGroup/overview"
} 