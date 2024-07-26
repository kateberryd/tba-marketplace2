export const ABI = [
  {
    "name": "UpgradeableImpl",
    "type": "impl",
    "interface_name": "openzeppelin::upgrades::interface::IUpgradeable"
  },
  {
    "name": "openzeppelin::upgrades::interface::IUpgradeable",
    "type": "interface",
    "items": [
      {
        "name": "upgrade",
        "type": "function",
        "inputs": [
          {
            "name": "new_class_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "TBAMarketplaceimpl",
    "type": "impl",
    "interface_name": "tbamarketplace::interfaces::ITBAMarketplace::ITBAMarketplace"
  },
  {
    "name": "core::byte_array::ByteArray",
    "type": "struct",
    "members": [
      {
        "name": "data",
        "type": "core::array::Array::<core::bytes_31::bytes31>"
      },
      {
        "name": "pending_word",
        "type": "core::felt252"
      },
      {
        "name": "pending_word_len",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "name": "core::integer::u256",
    "type": "struct",
    "members": [
      {
        "name": "low",
        "type": "core::integer::u128"
      },
      {
        "name": "high",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "name": "core::bool",
    "type": "enum",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "name": "tbamarketplace::base::types::Listing",
    "type": "struct",
    "members": [
      {
        "name": "listing_id",
        "type": "core::integer::u256"
      },
      {
        "name": "seller",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "tba_address",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "amount",
        "type": "core::integer::u256"
      },
      {
        "name": "is_active",
        "type": "core::bool"
      }
    ]
  },
  {
    "name": "tbamarketplace::base::types::Bid",
    "type": "struct",
    "members": [
      {
        "name": "bid_id",
        "type": "core::integer::u256"
      },
      {
        "name": "bidder",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "amount",
        "type": "core::integer::u256"
      },
      {
        "name": "is_active",
        "type": "core::bool"
      }
    ]
  },
  {
    "name": "tbamarketplace::interfaces::ITBAMarketplace::ITBAMarketplace",
    "type": "interface",
    "items": [
      {
        "name": "get_name",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::byte_array::ByteArray"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_listings",
        "type": "function",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<tbamarketplace::base::types::Listing>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_listing",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "tbamarketplace::base::types::Listing"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_bids",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<tbamarketplace::base::types::Bid>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "get_bid",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          },
          {
            "name": "bid_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [
          {
            "type": "tbamarketplace::base::types::Bid"
          }
        ],
        "state_mutability": "view"
      },
      {
        "name": "list_tba",
        "type": "function",
        "inputs": [
          {
            "name": "tba_address",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "place_bid",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          },
          {
            "name": "amount",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "accept_bid",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          },
          {
            "name": "bid_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "cancel_listing",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "name": "cancel_bid",
        "type": "function",
        "inputs": [
          {
            "name": "listing_id",
            "type": "core::integer::u256"
          },
          {
            "name": "bid_id",
            "type": "core::integer::u256"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "name": "constructor",
    "type": "constructor",
    "inputs": [
      {
        "name": "owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "tbamarketplace::base::types::TBAEvent",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "listing_id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "listing",
        "type": "tbamarketplace::base::types::Listing"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "tbamarketplace::base::types::BidEvent",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "bid_id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "bid",
        "type": "tbamarketplace::base::types::Bid"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "tbamarketplace::base::types::BidAccepted",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "listing_id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "listing",
        "type": "tbamarketplace::base::types::Listing"
      },
      {
        "kind": "data",
        "name": "bid_id",
        "type": "core::integer::u256"
      },
      {
        "kind": "data",
        "name": "bid",
        "type": "tbamarketplace::base::types::Bid"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted",
    "type": "event",
    "members": [
      {
        "kind": "key",
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "kind": "key",
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "OwnershipTransferred",
        "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred"
      },
      {
        "kind": "nested",
        "name": "OwnershipTransferStarted",
        "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferStarted"
      }
    ]
  },
  {
    "kind": "struct",
    "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
    "type": "event",
    "members": [
      {
        "kind": "data",
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "Upgraded",
        "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded"
      }
    ]
  },
  {
    "kind": "enum",
    "name": "tbamarketplace::tba_marketplace::tba_marketplace::TBAMarketplace::Event",
    "type": "event",
    "variants": [
      {
        "kind": "nested",
        "name": "TBAEvent",
        "type": "tbamarketplace::base::types::TBAEvent"
      },
      {
        "kind": "nested",
        "name": "BidEvent",
        "type": "tbamarketplace::base::types::BidEvent"
      },
      {
        "kind": "nested",
        "name": "BidAccepted",
        "type": "tbamarketplace::base::types::BidAccepted"
      },
      {
        "kind": "flat",
        "name": "OwnableEvent",
        "type": "openzeppelin::access::ownable::ownable::OwnableComponent::Event"
      },
      {
        "kind": "flat",
        "name": "UpgradeableEvent",
        "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event"
      }
    ]
  }
]