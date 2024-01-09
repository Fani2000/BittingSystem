using AuctionService.Data;
using AuctionService.Entities;
using Contracts;
using MassTransit;

namespace AuctionService.Consumers
{
    public class AuctionFinishedConsumer : IConsumer<AuctionFinished>
    {
        private readonly AuctionDbContext context;

        public AuctionFinishedConsumer(AuctionDbContext context)
        {
            this.context = context;
        }

        public async Task Consume(ConsumeContext<AuctionFinished> context)
        {
            Console.WriteLine("---> Consuming Auction Finished");

            var auction = await this.context.Auctions.FindAsync(context.Message.AuctionId);

            if(context.Message.ItemSold)
            {
                auction.Winner = context.Message.Winner;
                auction.SoldAmount = context.Message.Amount;
            }

            auction.Status = auction.SoldAmount > auction.ReservedPrice ? Status.Finished : Status.ReserveNotMet;

            await this.context.SaveChangesAsync();
        }
    }
}
