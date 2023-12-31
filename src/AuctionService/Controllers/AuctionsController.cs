using AuctionService.Data;
using AuctionService.DTOs;
using AuctionService.Entities;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AuctionService.Controllers
{
    [ApiController]
    [Route("api/auctions")]
    public class Auctions : ControllerBase
    {
        private readonly AuctionDbContext _context;
        private readonly IMapper _mapper;

        public Auctions(AuctionDbContext context, IMapper mapper)
        {
            this._context = context;
            this._mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<AuctionDto>>> GetAllAuctions()
        {
            var auctions = await _context.Auctions
                    .Include(x => x.Item)
                    .OrderBy(x => x.Item.Make)
                    .ToListAsync();

            System.Console.WriteLine(auctions.Count());

            return _mapper.Map<List<AuctionDto>>(auctions);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AuctionDto>> getAuctionById(Guid id)
        {
            var auction = await _context.Auctions
            .Include(x => x.Item)
            .FirstOrDefaultAsync(x => x.Id == id);

            if (auction == null) return NotFound();

            return _mapper.Map<AuctionDto>(auction);

        }

        [HttpPost]
        public async Task<ActionResult<Auction>> CreateAuction(CreateAuctionDto auctionDto)
        {
            var auction = _mapper.Map<Auction>(auctionDto);

            // TODO: Add current user as seller
            auction.Seller = "test";

            Console.WriteLine(auction.ToString());

            _context.Auctions.Add(auction);
            _context.SaveChanges();

            var results = await _context.SaveChangesAsync() > 0;

            if (!results) return BadRequest("Could not save an auction to the database");

            return CreatedAtAction(nameof(getAuctionById), new { auction.Id }, _mapper.Map<AuctionDto>(auction));
        }
    }
}